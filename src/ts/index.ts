type NodeListType = NodeListOf<Element>;
type ElementType = HTMLElement;
type InnerHTMLType = string;

interface Activity {
    title: string,
    src: string
}

window.addEventListener('DOMContentLoaded', () => {

    //Tabs
    const headerTabs = document.querySelectorAll('.main-header-item') as NodeListType,
          headerTabsParent = document.querySelector('.main-header') as ElementType,
          gambTabs = document.querySelectorAll('.menu-item') as NodeListType,
          gambTabsParent = document.querySelector('.menu') as ElementType;

    headerTabsParent.addEventListener('click', (e) => changeActive(e, headerTabs, 'main-header-item'));
    gambTabsParent.addEventListener('click', (e) => changeActive(e, gambTabs, 'menu-item'));

    function changeActive(e: Event, tabs: NodeListType, classSelector: string):void {
        const target = e.target as ElementType;
        if (target && target.classList.contains(classSelector)) {
            tabs.forEach((item, i) => {
                if (target == item) {
                    tabs.forEach(item => item.classList.remove('item-active')); 
                    tabs[i].classList.add('item-active');
                };
            });
        };
    }

    //Gamb-menu

    const menuBtn = document.querySelector('.gamb-menu') as ElementType,
          menu = document.querySelector('.menu') as ElementType,
          mainText = document.querySelector('.main') as ElementType;

    menuBtn.addEventListener('click', () =>{
	    menu.classList.toggle('active');
        if (menu.classList.contains('active')) {
            mainText.style.margin = '0px auto';
        }
        else {
            mainText.style.margin = '183px auto 0px auto';
        }
    });
    
    //Gamb-search
    let searchBtn = document.querySelector('.search-obj-1') as ElementType;
    let searchRowGamb = document.querySelector('.search-row-gamb') as ElementType;
    let searchRow = document.querySelector('.search-row') as ElementType;

    searchBtn.addEventListener('click', () => {
        searchRowGamb.classList.toggle('search-active');
        searchRow.classList.toggle("search-row-border");
    });

    let searchBtnGamb = document.querySelectorAll('.search-obj-1-gamb') as NodeListType;

    searchBtnGamb.forEach((item) => {
        item.addEventListener('click', () => {
            searchBtn.innerHTML = item.innerHTML as InnerHTMLType;
            searchRowGamb.classList.toggle('search-active');
            searchRow.classList.toggle("search-row-border");
        });
    });

    //Classes
    class Activities {

        title:string
        src:string
        parentSelector!: string;
        parent: ElementType

        constructor(title:string, src:string, parentSelector: string) {
            this.title = title;
            this.src = src;
            this.parent = document.querySelector(parentSelector) as ElementType;
        }

        render(): void {
            const element = document.createElement("div") as HTMLDivElement;
            element.innerHTML = `
                <div class = "activities-obj">
                <img src = ${this.src}>
                <div class = "fig-1">${this.title}</div>
                </div>
            ` as InnerHTMLType;
            this.parent.append(element);
        }
    }

    fetch('http://localhost:3000/menu').then(res => res.json())
        .then(data => {
            data.forEach(({title, src}:Activity) => {
                new Activities(title, src, ".activities-row").render();
            });
        });

    //Server
    const forms = document.querySelector('form') as HTMLFormElement;

    function postData(form:HTMLFormElement) {
        form.addEventListener('submit', (e:SubmitEvent) => {
            const formData = new FormData(form) as FormData;
            const json = JSON.stringify(Object.fromEntries(formData.entries()));
            e.preventDefault();
            fetch('http://localhost:3000/requests', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: json
            }).then(data => {
                console.log(data);
                form.reset();
                ModalOpen();
            }).catch((e) => {
                console.log(e);
                form.reset();
                Wrong();
                ModalOpen();
            });
        });
    };
    postData(forms);

    //Modal
    const modal = document.querySelector('.modal') as ElementType;
    const modalBtn = document.querySelector('.modal-btn') as ElementType;

    function ModalClose() {
        modal.classList.remove('show');
        modal.classList.add('hide');
        document.body.style.overflow = '' as string;
    }

    function Wrong() {
        const modalText = document.querySelector('.modal-text') as ElementType;
        modalText.textContent = "Something wrong..." as string;
    };

    function ModalOpen() {
        modal.classList.add('show');
        modal.classList.remove('hide');
        document.body.style.overflow = 'hidden' as string;
        setTimeout(ModalClose, 5000);
    }

    modalBtn.addEventListener('click', ModalClose);
    modal.addEventListener('click', (e: MouseEvent) => {
        if (e.target === modal) {
            ModalClose();
        };
    });

    document.addEventListener('keydown', (e: KeyboardEvent) => {
        if (e.code === "Escape") {
            ModalClose();
        };
    });

});
