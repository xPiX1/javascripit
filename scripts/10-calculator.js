let calculation = localStorage.getItem('calculation') || ' ';
            document.querySelector('.js-calculation').innerHTML = calculation;
            function updateCalculation(value){
                calculation += value;
                document.querySelector('.js-calculation').innerHTML = calculation;
                localStorage.setItem('calculation',calculation);
            }