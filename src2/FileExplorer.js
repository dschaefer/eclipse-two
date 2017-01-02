//@flow

document.registerElement('eclipse-fileexplorer', class extends HTMLElement {
    attachedCallback() {
        this.innerHTML = `
            <ul class="fa-ul">
                <li>
                    <span class="fa-li fa fa-plus-square-o"></span>
                    <a href="#">/Users/dschaefer</a>
                    <ul class="fa-ul">
                        <li>
                            <span class="fa-li fa fa-file"></span>
                            <a href="#">myfile.txt</a>
                        </li>
                    </ul>
                </li>
            <ul>
        `;

        this.style.overflow = 'auto';
        this.style.height = '100%';
    }
});