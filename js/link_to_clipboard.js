document.addEventListener('DOMContentLoaded', function () {
    const copyButtons = document.querySelectorAll('.copy-button');

    copyButtons.forEach(function (button) {
        button.addEventListener('click', function () {
            const link = this.previousElementSibling; // Получить предыдущий элемент (ссылку)
            const linkText = link.href; // Получить адрес ссылки

            // Створити тимчасовий елемент textarea для копіювання в буфер обміну
            const tempTextarea = document.createElement('textarea');
            tempTextarea.value = linkText;
            document.body.appendChild(tempTextarea);
            tempTextarea.select();

            // Копіювати текст у буфер обміну
            document.execCommand('copy');

            // Видалити тимчасовий елемент textarea
            document.body.removeChild(tempTextarea);

            // Показати повідомлення або виконати інші дії, якщо необхідно
            //alert('Ссылка скопирована в буфер обмена: ' + linkText);
        });
    });
});
