let enlargedImage = null;
const overlay = document.getElementById('overlay');
document.getElementById('directoryInput').addEventListener('change', function(event) {
    const files = event.target.files;
    const imageContainer = document.getElementById('imageContainer');
    imageContainer.innerHTML = ''; // Clear previous images

    Array.from(files).forEach(file => {
        if (file.type.startsWith('image/')) {
            const reader = new FileReader();
            reader.onload = function(e) {
                const div = document.createElement('div');
                div.classList.add('image-container');

                const img = document.createElement('img');
                img.src = e.target.result;
                //img.style.maxWidth = '150px'; // Adjust as needed
                img.style.margin = '10px';
                img.addEventListener('click', () => toggleEnlarge(img));
                const button = document.createElement('button');
                button.textContent = '🗑️';
                button.classList.add('delete-button');
                button.onclick = function() {
                    //div.remove();
                    remove_image(img);
                };

                div.appendChild(img);
                div.appendChild(button);
                
                imageContainer.appendChild(div);
            };
            reader.readAsDataURL(file);
        }
    });
});


function toggleEnlarge(container) {
    
    if (enlargedImage) {
      document.body.removeChild(enlargedImage);
      enlargedImage = null;
      overlay.style.display = 'none';
    } else {
      enlargedImage = container.cloneNode(true);
      enlargedImage.classList.add('enlarged');
      document.body.appendChild(enlargedImage);
      overlay.style.display = 'block';
      enlargedImage.addEventListener('click', () => toggleEnlarge(enlargedImage));
    }
  }

  
function remove_image(div) {
    const filename= div.src
    const fs = require('fs');
    const readline = require('readline');

    const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question('Voulez-vous supprimer le fichier ? (oui/non) ', (answer) => {
    if (answer.toLowerCase() === 'oui') {
        fs.unlink(filename, (err) => {
            if (err) {
                console.error(`Erreur lors de la suppression du fichier: ${err.message}`);
            } else {
                console.log('Fichier supprimé avec succès.');
            }
        });
    } else {
        console.log('Suppression annulée.');
    }
    rl.close();
});


}