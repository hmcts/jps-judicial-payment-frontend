export const defaultDtOptions = {
    autoWidth: true,
    searching: false,
    lengthChange: false,
    paging: false,
    language:{
        info: "Showing <b>_START_</b> to <b>_END_</b> of <b>_TOTAL_</b> results",
        emptyTable: "No results available",
        infoEmpty: "Showing <b>0</b> to <b>0</b> of <b>0</b> results",
        paginate: {
            "previous": `<svg class="govuk-pagination__icon govuk-pagination__icon--prev" xmlns="http://www.w3.org/2000/svg" height="13" width="15" aria-hidden="true" focusable="false" viewBox="0 0 15 13">
                        <path d="m6.5938-0.0078125-6.7266 6.7266 6.7441 6.4062 1.377-1.449-4.1856-3.9768h12.896v-2h-12.984l4.2931-4.293-1.414-1.414z"></path>
                    </svg> Previous`,
            "next": `Next <svg class="govuk-pagination__icon govuk-pagination__icon--next" xmlns="http://www.w3.org/2000/svg" height="13" width="15" aria-hidden="true" focusable="false" viewBox="0 0 15 13">
                            <path d="m8.107-0.0078125-1.4136 1.414 4.2926 4.293h-12.986v2h12.896l-4.1855 3.9766 1.377 1.4492 6.7441-6.4062-6.7246-6.7266z"></path>
                        </svg> `,
            "first": '',
            "last": ''
        }
    },

    dom: '<if<t>lp>'
}
