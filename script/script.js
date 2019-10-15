window.addEventListener('DOMContentLoaded', function(){
    'use strict';
 
    // Timer
    function countTimer(deadline){
        let timerHours = document.querySelector('#timer-hours'),
            timerMinutes = document.querySelector('#timer-minutes'),
            timerSeconds = document.querySelector('#timer-seconds'),
            timerDays = document.querySelector('#timer-days');

        function getTimeRemaining(){
            let dateStop = new Date(deadline).getTime(),
                dateNow = new Date().getTime(),
                timeRemaining = (dateStop - dateNow) / 1000,
                seconds = Math.floor(timeRemaining % 60),
                minutes = Math.floor((timeRemaining / 60) % 60),
                hours = Math.floor(timeRemaining / 60 / 60) % 24,
                days = Math.floor(timeRemaining / 60 / 60 / 24);
                return{timeRemaining, days, hours, minutes, seconds};
        }

        function updateClock(){
            let timer = getTimeRemaining();
            timerHours.textContent = timer.hours;
            timerMinutes.textContent = timer.minutes;
            timerSeconds.textContent = timer.seconds;
            timerDays.textContent = timer.days;

            if (timer.timeRemaining > 0){
                setTimeout(updateClock, 1000);
            } else {
                timerHours.textContent = "00";
                timerMinutes.textContent = "00";
                timerSeconds.textContent = "00";
                timerDays.textContent = "00";
                timerHours.style.color = 'red';
                timerMinutes.style.color = 'red';
                timerSeconds.style.color = 'red';
                timerDays.style.color = 'red';
            }
        }
        updateClock();
    }

    countTimer('25 october 2019');

    //menu
    const toggleMenu = () => {
        const btnMenu = document.querySelector(".menu"),
            menu = document.querySelector('menu');


        const handlerMenu = () => {
            menu.classList.toggle('active-menu');
        };

        btnMenu.addEventListener('click', handlerMenu);

        menu.addEventListener('click', (event) => {
            let target = event.target;
            
            if(event.target.matches('a')){
                handlerMenu();
            } else {
                if(target.classList.contains('close-btn')){
                    handlerMenu();
                }
            }
        });

    };
    toggleMenu();

    //popup

    const togglePopUp = () => {
        const popup = document.querySelector('.popup'),
            popupBtn = document.querySelectorAll('.popup-btn');
        
        popupBtn.forEach((elem) => {
            elem.addEventListener('click', () => {
                popup.style.display = 'block';
            });
        });

        popup.addEventListener('click', (event) => {
            let target = event.target;

            if(target.classList.contains('popup-close')){
                popup.style.display = 'none';
            } else {
                target = target.closest('.popup-content');
                
                if(!target){
                    popup.style.display = 'none';
                }
            }
        });

    };

    togglePopUp();

    //табы

    const tabs = () => {
        const tabHeader = document.querySelector('.service-header'),
            tab = tabHeader.querySelectorAll('.service-header-tab'),
            tabContent = document.querySelectorAll('.service-tab');

        const toggleTabContent = (index) => {
           for(let i = 0; i < tabContent.length; i++){
               if(index === i){
                   tab[i].classList.add('active');
                   tabContent[i].classList.remove('d-none');
               } else{
                tab[i].classList.remove('active');
                tabContent[i].classList.add('d-none');
               }
           } 
        };

        tabHeader.addEventListener('click', (event) => {
            let target = event.target;
                target = target.closest('.service-header-tab');

            if (target){
                tab.forEach((item, i) => {
                    if(item === target){
                        toggleTabContent(i);
                    }
                });
            }
        });

    };

    tabs();

    //slider

    const slider = () => {
        const slide = document.querySelectorAll('.portfolio-item'),
            slider = document.querySelector('.portfolio-content');

        let dotUl = document.createElement('ul');
        dotUl.className = "portfolio-dots";
        slider.append(dotUl);
        slide.forEach((elem) => {
            let dotli = document.createElement('li');
            dotli.className = "dot";
            dotUl.append(dotli);

        });
        let dot = document.querySelectorAll('.dot');

        let currentSlide = 0,
            interval;

        const nextSlide = (elem, index, strClass) => {
            elem[index].classList.add(strClass);
        };
        const prevSlide = (elem, index, strClass) => {
            elem[index].classList.remove(strClass);
        };

        const autoPlaySlide = () => {
            prevSlide(slide, currentSlide, 'portfolio-item-active');
            prevSlide(dot, currentSlide, 'dot-active');
            currentSlide++;
            if(currentSlide >= slide.length){
                currentSlide = 0;
            }
            nextSlide(slide, currentSlide, 'portfolio-item-active');
            nextSlide(dot, currentSlide, 'dot-active');
        };
        const startSlide = (time = 3000) => {
            interval = setInterval(autoPlaySlide, time);
        };
        const stopSlide = () => {
            clearInterval(interval);
        };

        slider.addEventListener('click', () => {
            event.preventDefault();

            let target = event.target;

            if(!target.matches('#arrow-right, #arrow-left, .dot')){
                return;
            }

            prevSlide(slide, currentSlide, 'portfolio-item-active');
            prevSlide(dot, currentSlide, 'dot-active');

            if(target.matches('#arrow-right')){
                currentSlide++;
            } else if(target.matches('#arrow-left')){
                currentSlide--;
            } else if(target.matches('.dot')){
                dot.forEach((elem, index) =>{
                    if(elem === target){
                        currentSlide = index;
                    }
                });
            }
            if(currentSlide >= slide.length){
                currentSlide = 0;
            }
            if(currentSlide < 0){
                currentSlide = slide.length - 1;
            }

            nextSlide(slide, currentSlide, 'portfolio-item-active');
            nextSlide(dot, currentSlide, 'dot-active');
        });
        slider.addEventListener('mouseover', (event) =>{
            if(event.target.matches('.portfolio-btn') || event.target.matches('.dot')){
                stopSlide();
            }
        });
        slider.addEventListener('mouseout', (event) =>{
            if(event.target.matches('.portfolio-btn') || event.target.matches('.dot')){
                startSlide();
            }
        });
        startSlide(1500);
            
    };


    slider();

    //calculator
    const calculator = (price = 100) => {
        const calc = document.querySelectorAll('.calc-item'),
            calcBlock = document.querySelector('.calc-block'),
            calcType = document.querySelector('.calc-type'),
            calcSquare = document.querySelector('.calc-square'),
            calcDay = document.querySelector('.calc-day'),
            calcCount = document.querySelector('.calc-count'),
            totalValue = document.getElementById('total');
        calc.forEach((elem) => {
            elem.addEventListener('input', (item) => {
                elem.value = elem.value.replace(/[^\d.]/, '');
            });
        }); 

        const countSum = () => {
            let total = 0,
            countValue = 1,
            dayValue = 1;
            const typeValue = calcType.options[calcType.selectedIndex].value,
                 squareValue = +calcSquare.value;

            if (calcCount.value > 1){
                countValue += ( calcCount.value -1) / 10;
            }

            if (calcDay.value && calcDay.value < 5){
                dayValue *= 2;
            } else if(calcDay.value &&  calcDay.value  < 10){
                dayValue *= 1.5;
            }

            if(typeValue && squareValue){
                total = Math.floor(price * typeValue * squareValue * countValue * dayValue);
            } else {
                total = 0;
            }

            totalValue.textContent = total; 
        };
        calcBlock.addEventListener('input', (event) => {
            const target = event.target;
            if (target.matches('.calc-item')){
                countSum();
            }
        });
    };
    
    calculator(100);

    //Photos
    const changePhoto = () => { 
        const team = document.querySelector('.command');
            
        team.addEventListener('mouseover', (event) => {
            let target = event.target;
            
            if (target.matches('img')){
                let data = event.target.dataset.img;
                event.target.dataset.img = event.target.src;
                event.target.src = data;
                
            }
            
        });
        team.addEventListener('mouseout', (event) => {
            let target = event.target;
            
            if (target.matches('img')){
                let data = event.target.dataset.img;
                event.target.dataset.img = event.target.src;
                event.target.src = data;
            }
            
        });
    };

    changePhoto();


});