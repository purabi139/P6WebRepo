define([
    "underscore", "pgbu-backbone", "i18n!nls/localeStrings"
], function (_, PgbuBackbone, locale) {
    return {
        FetchNewWorkflow: PgbuBackbone.Model.extend({
            url: function () {
                return _.formatString(
                    "rest/workflows/templates/empty?workflowName=%0&initialStepName=%1&finalStepName=%2",
                    locale.label.workflows.default_workflow_name,
                    locale.label.workflows.default_initial_step_name,
                    locale.label.workflows.default_final_step_name);
            }
        }),

        ExistingWorkflow: PgbuBackbone.Model.extend({
            idAttribute: "ID",
            urlRoot: "rest/workflows/templates"
        })
    };
});