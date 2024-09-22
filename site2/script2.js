

async function getImagesFromDirectory(directoryPath) {
    try {
        const response = await fetch(directoryPath);
        const text = await response.text();
        
        // Utilisation d'une expression régulière pour trouver les fichiers d'image
        const imageExtensions = ['jpg', 'jpeg', 'png', 'gif', 'bmp'];
        const imageFiles = text.match(new RegExp(`[^\\s]+\\.(?:${imageExtensions.join('|')})`, 'g'));

        if (imageFiles) {
            return imageFiles.map(file => `${directoryPath}/${file}`);
        } else {
            console.log('Aucune image trouvée dans le répertoire.');
            return [];
        }
    } catch (error) {
        console.error('Erreur lors de la récupération des images :', error);
        return [];
    }
}

// Exemple d'utilisation
const directoryPath = 'G:\ComfyUI_Test\ComfyUI\output';
getImagesFromDirectory(directoryPath).then(images => {
    console.log('Images trouvées :', images);
});