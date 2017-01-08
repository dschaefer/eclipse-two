window.onload = () => {
    const box = document.querySelector('.mt-2');
    if (box) {
        const a = box.children[0];
        a.textContent = 'Open in Eclipse Two';
    }
};

console.log('preload loaded');