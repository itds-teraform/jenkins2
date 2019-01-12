/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for
 * license information.
 */

// Show/hide some of the configuration entries based on the orchestrator type chosen
Behaviour.specify("select[name$=containerService]", 'hide-optional-based-on-orchestrator', 10000, function(select) {
    function handleChange() {
        var value = $(select).getValue();

        var isAKS = /\|\s*aks$/i.test(value);
        var isKubernetes = /\|\s*(?:kubernetes|aks)$/i.test(value);
        var isSwarm = /\|\s*swarm$/i.test(value);
        var isDCOS = /\|\s*dcos$/i.test(value);

        setElementVisibility(isKubernetes, 'secretName', 'secretNamespace');
        setElementVisibility(isSwarm, 'swarmRemoveContainersFirst');
        setElementVisibility(isDCOS, 'dcosDockerCredentialsPath', 'dcosDockerCredenditalsPathShared');
        setElementVisibility(!isAKS, 'sshCredentialsId');
    }

    function setElementVisibility(show) {
        for (var i = 1, len = arguments.length; i < len; ++i) {
            var name = arguments[i];
            var c = findNearBy(select, name);
            if (c === null) {
                return;
            }

            if (show) {
                $(c).up('tr').show();
            } else {
                $(c).up('tr').hide();
            }
        }
    }

    handleChange();
    $(select).on('change', handleChange);
    $(select).on('click', handleChange);
});
