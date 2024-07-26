import "../index.html";
import "../css/style.css";

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

    menuBtn.addEventListener('click', ():void => {
	    menu.classList.toggle('active');
        if (menu.classList.contains('active')) {
            mainText.style.margin = '0px auto' as string;
        }
        else {
            mainText.style.margin = '183px auto 0px auto' as string;
        }
    });
    
    //Gamb-search
    const searchBtn = document.querySelector('.search-obj-1') as ElementType,
          searchRowGamb = document.querySelector('.search-row-gamb') as ElementType,
          searchRow = document.querySelector('.search-row') as ElementType,
          searchBtnGamb = document.querySelectorAll('.search-obj-1-gamb') as NodeListType;

    searchBtn.addEventListener('click', ():void => {
        searchRowGamb.classList.toggle('search-active');
        searchRow.classList.toggle("search-row-border");
    });

    searchBtnGamb.forEach((item):void => {
        item.addEventListener('click', () => {
            searchBtn.innerHTML = item.innerHTML as InnerHTMLType;
            searchRowGamb.classList.toggle('search-active');
            searchRow.classList.toggle("search-row-border");
        });
    });

    //Classes
    // class Activities {

    //     title:string
    //     src:string
    //     parentSelector!: string;
    //     parent: ElementType

    //     constructor(title:string, src:string, parentSelector: string) {
    //         this.title = title;
    //         this.src = src;
    //         this.parent = document.querySelector(parentSelector) as ElementType;
    //     }

    //     render(): void {
    //         const element = document.createElement("div") as HTMLDivElement;
    //         element.innerHTML = `
    //             <div class = "activities-obj">
    //                 <img src = "assets/images/act-1.jpg">
    //                 <div class = "fig-1">${this.title}</div>
    //             </div>
    //         ` as InnerHTMLType;
    //         this.parent.append(element);
    //     }
    // }

    // fetch('http://localhost:3001/menu').then(res => res.json())
    //     .then(data => {
    //         data.forEach(({title, src}:Activity) => {
    //             new Activities(title, src, ".activities-row").render();
    //         });
    //     });

    //Server
    const forms = document.querySelector('form') as HTMLFormElement;

    function postData(form:HTMLFormElement) {
        form.addEventListener('submit', (e:SubmitEvent) => {
            const formData = new FormData(form) as FormData;
            const json = JSON.stringify(Object.fromEntries(formData.entries()));
            e.preventDefault();
            fetch('https://jsonplaceholder.typicode.com/posts', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: json
            }).then(():void => {
                form.reset();
                ModalOpen();
            }).catch(():void => {
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

    function ModalClose():void {
        modal.classList.remove('show');
        modal.classList.add('hide');
        document.body.style.overflow = '' as string;
    }

    function Wrong():void {
        const modalText = document.querySelector('.modal-text') as ElementType;
        modalText.textContent = "Something wrong..." as string;
    };

    function ModalOpen():void {
        modal.classList.add('show');
        modal.classList.remove('hide');
        document.body.style.overflow = 'hidden' as string;
        setTimeout(ModalClose, 5000);
    }

    modalBtn.addEventListener('click', ModalClose);
    modal.addEventListener('click', (e: MouseEvent):void => {
        if (e.target === modal) {
            ModalClose();
        };
    });

    document.addEventListener('keydown', (e: KeyboardEvent):void => {
        if (e.code === "Escape") {
            ModalClose();
        };
    });

});
