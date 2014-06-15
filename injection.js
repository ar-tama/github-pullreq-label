(function () {

    var url = document.URL.slice(0, -5) + 'issues';
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.onreadystatechange = function() { if (xhr.readyState == 4) { onload(xhr.responseText); } }
    xhr.send();

    function onload (response) {
        var $issues_dom = $(response);
        var $pr_dom     = $(document.body);

        // apply labels css
        $pr_dom.find('#js-repo-pjax-container').after($issues_dom.find('#issues_list style'));

        // get labels
        var $injection_labels = {};
        $issues_dom.find('.issue-list-item').each(function () {
            $injection_labels[$(this).attr('id')] = $(this).find('.list-group-item-name .labels'); // issue_xxx : label objects
        });

        // apply labels
        var $prs = $pr_dom.find('.list-group-item');
        $prs.each(function () {
            var num    = 'issue_' + $(this).find('.list-group-item-number').text().slice(1);
            var $label = $injection_labels[num];
            if ($label) {
                $(this).find('.list-group-item-name .js-navigation-open').after($label);
            }
        });
    }
})()
