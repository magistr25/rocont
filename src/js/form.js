document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('ctaForm');

    form.addEventListener('submit', function(e) {
        e.preventDefault();

        // Собираем данные формы
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());

        if (!form.elements.agreement.checked) {
            alert('Поставьте галочку о согласии!');
            return;
        }

        // Место для интеграции с бэком (fetch/post/AJAX)
        // Пример для будущей отправки:
        /*
        fetch('https://example.com/api/submit', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data)
        })
        .then(r => r.json())
        .then(resp => {
          // Успешно отправлено
          alert('Спасибо! Форма отправлена.');
          form.reset();
        })
        .catch(() => alert('Ошибка отправки. Попробуйте позже.'));
        */

        // Пока просто выводим данные в консоль
        console.log('Отправляемые данные:', data);
        alert('Демо: данные формы собраны, можно отправлять на сервер.');

        form.reset(); // очищаем форму
    });
});
