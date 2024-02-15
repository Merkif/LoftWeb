import LazyLoad from "vanilla-lazyload";
let lazyLoadInstance = new LazyLoad({});

/* Проверяем наличие jQuery */
window.addEventListener('load', () => {
    if (window.jQuery) {
        /* Обновляем Lazy по AJAX-событию в фильтре */
        $(document).on('mse2_load', function (e, data) { 
            lazyLoadInstance.update();
        });
    }
})