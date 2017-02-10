window.onload = () => {
    const box = document.querySelector('.mt-2');
    if (box) {
        const a = box.children[0];
        a.textContent = 'Open in Two IDE';
    }
};

console.log('preload loaded');