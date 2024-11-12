        function updateTime() {
            const now = new Date();
            const options = { hour: '2-digit', minute: '2-digit', hour12: false, timeZone: 'Europe/Bucharest' };
            const timeString = now.toLocaleTimeString('en-GB', options);
            document.getElementById('time').textContent = timeString;
        }

        setInterval(updateTime, 1000);
        updateTime();

    const display = document.querySelector('.display');
        const buttons = document.querySelectorAll('.btn');
        const themeToggle = document.querySelector('.theme-toggle');

        
        let currentValue = '0';
        let previousValue = null;
        let operation = null;
        let shouldResetDisplay = false;

        function updateDisplay() {
            display.textContent = currentValue;
            display.style.animation = 'displayUpdate 0.3s ease';
            setTimeout(() => {
                display.style.animation = '';
            }, 300);
        }

        function clear() {
            currentValue = '0';
            previousValue = null;
            operation = null;
            updateDisplay();
        }

        function handleNumber(num) {
            if (shouldResetDisplay) {
                currentValue = num;
                shouldResetDisplay = false;
            } else {
                currentValue = currentValue === '0' ? num : currentValue + num;
            }
            updateDisplay();
        }

        function handleDecimal() {
            if (!currentValue.includes('.')) {
                currentValue += '.';
                updateDisplay();
            }
        }

        function handleOperator(op) {
            if (previousValue === null) {
                previousValue = currentValue;
            } else if (operation) {
                currentValue = calculate();
                updateDisplay();
            }
            operation = op;
            shouldResetDisplay = true;
        }

        function calculate() {
            const prev = parseFloat(previousValue);
            const current = parseFloat(currentValue);
            if (isNaN(prev) || isNaN(current)) return '';
            let result;
            switch (operation) {
                case '+': result = prev + current; break;
                case '-': result = prev - current; break;
                case '×': result = prev * current; break;
                case '÷': result = prev / current; break;
                default: return '';
            }
            previousValue = null;
            operation = null;
            return result.toString();
        }

        buttons.forEach(button => {
            button.addEventListener('click', () => {
                button.style.animation = 'buttonPress 0.1s ease';
                setTimeout(() => {
                    button.style.animation = '';
                }, 100);

                const value = button.textContent;
                if ('0123456789'.includes(value)) {
                    handleNumber(value);
                } else if (value === '.') {
                    handleDecimal();
                } else if ('+-×÷'.includes(value)) {
                    handleOperator(value);
                } else if (value === '=') {
                    if (operation && previousValue) {
                        currentValue = calculate();
                        updateDisplay();
                        shouldResetDisplay = true;
                    }
                } else if (value === 'AC') {
                    clear();
                } else if (value === '+/-') {
                    currentValue = (parseFloat(currentValue) * -1).toString();
                    updateDisplay();
                } else if (value === '%') {
                    currentValue = (parseFloat(currentValue) / 100).toString();
                    updateDisplay();
                }
            });
        });

        themeToggle.addEventListener('click', () => {
            document.body.classList.toggle('dark-mode');
        });

        let history = JSON.parse(localStorage.getItem('calculatorHistory')) || [];
        function addToHistory(expression, result) {
            history.push({ expression, result });
            localStorage.setItem('calculatorHistory', JSON.stringify(history));
            updateHistoryDisplay();
        }
        function updateHistoryDisplay() {
            const historyList = document.getElementById('history-list');
            historyList.innerHTML = ''; // Clear current list
        
            history.forEach((item, index) => {
                const li = document.createElement('li');
                li.textContent = `${item.expression} = ${item.result}`;
                li.addEventListener('click', () => insertFromHistory(item));
                historyList.appendChild(li);
            });
        }
        function insertFromHistory(item) {
            currentValue = item.result;
            updateDisplay();
        }
        function clearHistory() {
            history = [];
            localStorage.removeItem('calculatorHistory');
            updateHistoryDisplay();
        }
        function calculate() {
            const prev = parseFloat(previousValue);
            const current = parseFloat(currentValue);
            if (isNaN(prev) || isNaN(current)) return '';
            let result;
            switch (operation) {
                case '+': result = prev + current; break;
                case '-': result = prev - current; break;
                case '×': result = prev * current; break;
                case '÷': result = prev / current; break;
                default: return '';
            }
            previousValue = null;
            operation = null;
            
            addToHistory(`${prev} ${operation} ${current}`, result);
            
            return result.toString();
        }
        document.addEventListener('DOMContentLoaded', () => {
    updateHistoryDisplay();
});


        updateDisplay();