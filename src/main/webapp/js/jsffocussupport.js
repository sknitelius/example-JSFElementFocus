/* 
 * Copyright 2014 Stephan Knitelius <stephan@knitelius.com>.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

var KEY_CODE = {TAB: 9};

var ajaxStatus = {busy: false};
var focus = {tabIndex: null, forward: false, backward: false};

jsf.ajax.addOnEvent(function onStatusChange(data) {
    var status = data.status;
    if (status && status !== 'complete' && status !== 'success') {
        ajaxStatus.busy = true;
    } else if (status === 'success') {
        refocus();
        ajaxStatus.busy = false;
    }
});

$(document).on('keydown', function(event) {
    if (ajaxStatus.busy) {
        event.preventDefault();
    } else {
        var keyCode = event.keyCode || event.which;
        if (!event.shiftKey && keyCode === KEY_CODE.TAB) {
            registerTabForward();
        }
        else if (event.shiftKey && keyCode === KEY_CODE.TAB) {
            registerTabBackward();
        }
    }
});

$(document).click(function(event) {
    if (ajaxStatus.busy) {
        event.preventDefault();
    } else {
        registerClick();
    }
});

function registerClick() {
    focus.tabIndex = document.activeElement.getAttribute('tabindex');
    focus.forward = false;
    focus.backward = false;
}

function registerTabForward() {
    focus.tabIndex = document.activeElement.getAttribute('tabindex');
    focus.forward = true;
    focus.backward = false;
}

function registerTabBackward() {
    focus.tabIndex = document.activeElement.getAttribute('tabindex');
    focus.forward = false;
    focus.backward = true;
}

function refocus() {
    var targetTabIndex = focus.tabIndex;
    if(focus.forward) {
        targetTabIndex = parseInt(targetTabIndex) + 1;
    } else if(focus.backward) {
        targetTabIndex = parseInt(targetTabIndex) - 1;
    }
    $('[tabindex='+ targetTabIndex +']').focus();
}
