window.addEventListener('DOMContentLoaded', () => {
    //Tabs
    const tabs = document.querySelectorAll('.main-header-item'),
          tabsParent = document.querySelector('.main-header');

    function MakeUnactive() {
        tabs.forEach(item => {
            item.classList.remove('main-header-active');
        }); 
    };
    
    function MakeActive(i = 0) {
        tabs[i].classList.add('main-header-active');
    };

    tabsParent.addEventListener('click', (event) => {
        const target = event.target;
        if (target && target.classList.contains('main-header-item')) {
            tabs.forEach((item, i) => {
                if (target == item) {
                    MakeUnactive();
                    MakeActive(i);
                };
            });
        };
    });

    const gambTabs = document.querySelectorAll('.menu-item'),
          gambTabsParent = document.querySelector('.menu');

    function MakeUnactiveGamb() {
        gambTabs.forEach(item => {
            item.classList.remove('menu-item-active');
        }); 
    };
    
    function MakeActiveGamb(i = 0) {
        gambTabs[i].classList.add('menu-item-active');
    };

    gambTabsParent.addEventListener('click', (e) => {
        const gambTarget = e.target;
        if (gambTarget && gambTarget.classList.contains('menu-item')) {
            gambTabs.forEach((item, i) => {
                if (gambTarget == item) {
                    MakeUnactiveGamb();
                    MakeActiveGamb(i);
                };
            });
        };
    });

    //Gamb-menu

    let menuBtn = document.querySelector('.gamb-menu');
    let menu = document.querySelector('.menu');
    let mainText = document.querySelector('.main');
    menuBtn.addEventListener('click', function(){
	    menu.classList.toggle('active');
        if (menu.classList.contains('active')) {
            mainText.style.margin = '0px auto';
        }
        else {
            mainText.style.margin = '183px auto 0px auto';
        }
    });
    
    //Gamb-search
    let searchBtn = document.querySelector('.search-obj-1');
    let searchRowGamb = document.querySelector('.search-row-gamb');
    let searchRow = document.querySelector('.search-row');
        searchBtn.addEventListener('click', function(){
            searchRowGamb.classList.toggle('search-active');
            searchRow.classList.toggle("search-row-border");
        });
        let searchBtnGamb = document.querySelectorAll('.search-obj-1-gamb');
        searchBtnGamb.forEach((item) => {
            item.addEventListener('click', () => {
                searchBtn.innerHTML = item.innerHTML;
                searchRowGamb.classList.toggle('search-active');
                searchRow.classList.toggle("search-row-border");
            });
        });

    //Account
    // let profileButton = document.querySelector(".profile-img");
    // profileButton.addEventListener('click', () => {
    //     var name = prompt("Как вас зовут?");
    //     let account = document.querySelector(".profile-text-2");
    //     account.innerHTML = name;
    // });

    //Classes
    class Activities {
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
            data.forEach(({title, src}) => {
                new Activities(title, src, ".activities-row").render();
            });
        });

    //Server
    const forms = document.querySelector('form');
    function postData(form) {
        form.addEventListener('submit', (e) => {
            const formData = new FormData(form);
            console.log(formData);
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
            }).catch(() => {
                form.reset();
                Wrong();
                ModalOpen();
            });
        });
    };
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
    };

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
        };
    });

    document.addEventListener('keydown', (e) => {
        if (e.code === "Escape") {
            ModalClose();
        };
    });

});
