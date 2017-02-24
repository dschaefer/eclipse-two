import { remote } from 'electron';

window.onload = () => {
    const box = document.querySelector('.mt-2');
    if (box) {
        const a: HTMLAnchorElement = <HTMLAnchorElement> box.children[0];
        a.textContent = 'Open in Two IDE';
        a.href = '#';

        const input = box.previousElementSibling.children[2].children[0];
        a.onclick = () => {
            remote.dialog.showMessageBox({
                type: 'info',
                message: `Cloning ${input.getAttribute('value')}`
            })
        };
    }
};

console.log('preload loaded');