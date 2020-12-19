const scrollElm = () => {
    if ('scrollingElement' in document) {
        return document.scrollingElement;
    }
    if (navigator.userAgent.indexOf('WebKit') !== -1) {
        return document.body;
    }
    return document.documentElement;
};

const tabChange = (screlm) => {
    $('.tabloid_link').on('click', function (e) {
        e.preventDefault();
        const targetHref = $(this).attr('data-anchor');
        // 表示イベント後にアンカー位置へ瞬間移動
        // shown.bs.tab イベントを拾わないと、非表示のタブは display: none; になっているので .offset().top で要素の位置が正しく取得できない
        const targetTabId = `#tab${targetHref.charAt(0).toUpperCase()}${targetHref.slice(1)}`
        $(targetTabId).on('shown.bs.tab', function () {
//            let navbarHeight = 0;
//            if (typeof plugins.fixedanchor_js === 'function') {
//                navbarHeight = plugins.fixedanchor_js();
//            }
//            const classFixedAnchor = 'fixed_anchor';
//            const dataFixedAnchor = 'data-fixedanchor';
            let position = Math.ceil($(`#${targetHref}`).offset().top);
//            //$targetがクラス`fixed_anchor`を持っていない場合は差し引きを調整する
//            if (!$target.hasClass(classFixedAnchor) || $('body').attr(dataFixedAnchor) === 'false') {
//                position = position - navbarHeight;
//            }
            $(screlm).animate({ scrollTop: position }, 0);
            $(this).off('shown.bs.tab');
        });
        // タブ表示
        $(`.nav-item a[href="#${targetHref}"]`).tab('show');
        return false;
    });
};

$(window).on('load', function () {
    const screlm = scrollElm();
    tabChange(screlm);
});
