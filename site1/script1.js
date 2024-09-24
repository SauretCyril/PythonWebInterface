// import fs from 'fs';
// Uncaught SyntaxError: Unexpected token import
let enlargedImage = null;




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
                    showConfirmDialog(file,'Voulez-vous vraiment supprimer cette image ?', () => {
                        
                      });
                    
                    //remove_image(img);
                };
                // button.addEventListener('click', (e) => {
                //     e.stopPropagation();
                //     showConfirmDialog('Voulez-vous vraiment supprimer cette image ?', () => {
                //       container.remove();
                //       //reorganizeGrid(container.dataset.gridId);
                //     });
                //   });



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

  function showConfirmDialog(file,message, onConfirm) {
    const dialog = document.createElement('div');
    const fileobj = file;
    dialog.className = 'confirm-dialog';
    dialog.innerHTML = `
      <p>${message}</p>
      <button id="confirm-yes">Oui</button>
      <button id="confirm-no">Non</button>
      <p>${fileobj.path}</p>
    `;
    
    document.body.appendChild(dialog);
    
    const yesButton = dialog.querySelector('#confirm-yes');
    const noButton = dialog.querySelector('#confirm-no');
    
    yesButton.addEventListener('click', () => {
      document.body.removeChild(dialog);

      return true;
     
    });
    
    noButton.addEventListener('click', () => {
        document.body.removeChild(dialog);
        return false;
        
    });
  }

