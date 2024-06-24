"use strict";
window.addEventListener('DOMContentLoaded', () => {
    //Tabs
    const headerTabs = document.querySelectorAll('.main-header-item'), headerTabsParent = document.querySelector('.main-header'), gambTabs = document.querySelectorAll('.menu-item'), gambTabsParent = document.querySelector('.menu');
    headerTabsParent.addEventListener('click', (e) => changeActive(e, headerTabs, 'main-header-item'));
    gambTabsParent.addEventListener('click', (e) => changeActive(e, gambTabs, 'menu-item'));
    function changeActive(e, tabs, classSelector) {
        const target = e.target;
        if (target && target.classList.contains(classSelector)) {
            tabs.forEach((item, i) => {
                if (target == item) {
                    tabs.forEach(item => item.classList.remove('item-active'));
                    tabs[i].classList.add('item-active');
                }
                ;
            });
        }
        ;
    }
    //Gamb-menu
    const menuBtn = document.querySelector('.gamb-menu'), menu = document.querySelector('.menu'), mainText = document.querySelector('.main');
    menuBtn.addEventListener('click', () => {
        menu.classList.toggle('active');
        if (menu.classList.contains('active')) {
            mainText.style.margin = '0px auto';
        }
        else {
            mainText.style.margin = '183px auto 0px auto';
        }
    });
    //Gamb-search
    const searchBtn = document.querySelector('.search-obj-1'), searchRowGamb = document.querySelector('.search-row-gamb'), searchRow = document.querySelector('.search-row'), searchBtnGamb = document.querySelectorAll('.search-obj-1-gamb');
    searchBtn.addEventListener('click', () => {
        searchRowGamb.classList.toggle('search-active');
        searchRow.classList.toggle("search-row-border");
    });
    searchBtnGamb.forEach((item) => {
        item.addEventListener('click', () => {
            searchBtn.innerHTML = item.innerHTML;
            searchRowGamb.classList.toggle('search-active');
            searchRow.classList.toggle("search-row-border");
        });
    });
    //Classes
    class Activities {
        title;
        src;
        parentSelector;
        parent;
        constructor(title, src, parentSelector) {
            this.title = title;
            this.src = src;
            this.parent = document.querySelector(parentSelector);
        }
        render() {
            const element = document.createElement("div");
            element.innerHTML = `
                <div class = "activities-obj">
                <img src = ${this.src}>
                <div class = "fig-1">${this.title}</div>
                </div>
            `;
            this.parent.append(element);
        }
    }
    fetch('http://localhost:3000/menu').then(res => res.json())
        .then(data => {
        data.forEach(({ title, src }) => {
            new Activities(title, src, ".activities-row").render();
        });
    });
    //Server
    const forms = document.querySelector('form');
    function postData(form) {
        form.addEventListener('submit', (e) => {
            const formData = new FormData(form);
            const json = JSON.stringify(Object.fromEntries(formData.entries()));
            e.preventDefault();
            fetch('http://localhost:3000/requests', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: json
            }).then(() => {
                form.reset();
                ModalOpen();
            }).catch(() => {
                form.reset();
                Wrong();
                ModalOpen();
            });
        });
    }
    ;
    postData(forms);
    //Modal
    const modal = document.querySelector('.modal');
    const modalBtn = document.querySelector('.modal-btn');
    function ModalClose() {
        modal.classList.remove('show');
        modal.classList.add('hide');
        document.body.style.overflow = '';
    }
    function Wrong() {
        const modalText = document.querySelector('.modal-text');
        modalText.textContent = "Something wrong...";
    }
    ;
    function ModalOpen() {
        modal.classList.add('show');
        modal.classList.remove('hide');
        document.body.style.overflow = 'hidden';
        setTimeout(ModalClose, 5000);
    }
    modalBtn.addEventListener('click', ModalClose);
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            ModalClose();
        }
        ;
    });
    document.addEventListener('keydown', (e) => {
        if (e.code === "Escape") {
            ModalClose();
        }
        ;
    });
});
