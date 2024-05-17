(function() {
    'use strict';

    const config_elements = ['SkipVideosTickbox', 'AutoAdvanceTickbox', 'SkipIntroTickbox', 'GuessPracticeTickbox', 'VocabCompleterTickbox', 'ShowColumnTickbox'];
    const features = [
        { name: 'Skip Videos', id: 'SkipVideosTickbox' },
        { name: 'Auto Advance', id: 'AutoAdvanceTickbox' },
        { name: 'Skip Intro', id: 'SkipIntroTickbox' },
        { name: 'Guess Practice', id: 'GuessPracticeTickbox' },
        { name: 'Vocab Completer', id: 'VocabCompleterTickbox' },
        { name: 'Show Right Column', id: 'ShowColumnTickbox' }
    ];

    const overlay = create_overlay();
    const config_window = create_config_window(overlay);
    create_close_button(config_window);
    create_title(config_window, 'Configuration');
    features.forEach(feature => config_window.appendChild(build_menu_entry(feature.name, feature.id)));
    create_socials_button(config_window);  // Add the socials button to the config menu
    create_tweaks_button();

    setInterval(loop, 1000);
    load_config();

    function create_overlay() {
        return create_element('div', {
            style: 'width:100vw;height:100vh;position:fixed;top:0;left:0;z-index:9998;background-color:rgba(0,0,0,0.5);display:none;',
            id: 'overlay'
        }, document.body);
    }

    function create_config_window(parent) {
        return create_element('div', {
            style: 'width:300px;height:400px;position:fixed;top:50%;left:50%;transform:translate(-50%,-50%);background-color:white;z-index:9999;border:1px solid black;padding:10px;display:flex;flex-direction:column;align-items:center;justify-content:start;border-radius:10px;box-shadow:0px 0px 15px rgba(0,0,0,0.3);overflow-y:auto;',
            id: 'config_window'
        }, parent);
    }

    function create_close_button(parent) {
        create_element('button', {
            innerText: 'Close',
            style: 'margin-bottom:20px;padding:10px 20px;border:none;background-color:#444;color:white;border-radius:5px;cursor:pointer;',
            onclick: () => {
                config_window.style.display = 'none';
                overlay.style.display = 'none';
            }
        }, parent);
    }

    function create_title(parent, text) {
        create_element('h2', { innerText: text, id: 'config_title' }, parent);
    }

    function create_tweaks_button() {
        create_element('button', {
            innerText: 'Tweaks',
            id: 'tweaks_button',
            style: 'position:fixed;top:10px;left:50%;transform:translateX(-50%);z-index:10000;border:none;background-color:#ff9800;color:white;padding:10px 20px;border-radius:30px;font-size:16px;cursor:pointer;box-shadow:0px 4px 6px rgba(0,0,0,0.1);transition:background-color 0.3s,box-shadow 0.3s;',
            onmouseover: () => {
                tweaks_button.style.backgroundColor = '#e68900';
                tweaks_button.style.boxShadow = '0px 6px 8px rgba(0,0,0,0.2)';
            },
            onmouseout: () => {
                tweaks_button.style.backgroundColor = '#ff9800';
                tweaks_button.style.boxShadow = '0px 4px 6px rgba(0,0,0,0.1)';
            },
            onclick: () => {
                config_window.style.display = 'flex';
                overlay.style.display = 'block';
            }
        }, document.body);
    }

    function build_menu_entry(name, id) {
        const container = create_element('div', { style: 'display:flex;justify-content:space-between;margin:10px 0;width:100%;' });
        create_element('label', { innerText: name }, container);
        create_element('input', { type: 'checkbox', id }, container);
        return container;
    }

    function create_socials_button(parent) {
        create_element('button', {
            innerText: 'Socials/Credits',
            style: 'margin-top:20px;padding:10px 20px;border:none;background-color:#007bff;color:white;border-radius:5px;cursor:pointer;',
            onclick: show_socials_screen
        }, parent);
    }

    function show_socials_screen() {
        config_window.innerHTML = ''; // Clear current config window content
        create_close_button(config_window); // Add the close button to the socials screen
        create_title(config_window, 'Credits');
        create_element('p', { innerHTML: 'Steam: <a href="https://steamcommunity.com/profiles/76561198265104876" target="_blank">76561198265104876</a>' }, config_window);
        create_element('p', { innerHTML: 'YouTube: <a href="https://www.youtube.com/dylanhook" target="_blank">dylanhook</a>' }, config_window);
        create_element('p', { innerHTML: 'Discord: <a href="https://discord.gg/pN5fzxaEt5" target="_blank">Join Discord</a>' }, config_window);
        create_element('button', {
            innerText: 'Go Back',
            style: 'margin-top:20px;padding:10px 20px;border:none;background-color:#444;color:white;border-radius:5px;cursor:pointer;',
            onclick: () => {
                config_window.innerHTML = ''; // Clear current config window content
                create_close_button(config_window); // Add the close button back
                create_title(config_window, 'Configuration');
                features.forEach(feature => config_window.appendChild(build_menu_entry(feature.name, feature.id)));
                create_socials_button(config_window);  // Add the socials button to the config menu
            }
        }, config_window);
    }

    function create_element(tag, attributes, parent) {
        const element = document.createElement(tag);
        Object.assign(element, attributes);
        if (attributes.innerHTML) {
            element.innerHTML = attributes.innerHTML;  // Ensure innerHTML is set properly
        }
        parent && parent.appendChild(element);
        return element;
    }

    function load_config() {
        config_elements.forEach(id => {
            const value = localStorage.getItem(id);
            if (value === 'true') {
                document.getElementById(id).checked = true;
            }
        });
    }

    function sync_config() {
        config_elements.forEach(id => {
            localStorage.setItem(id, document.getElementById(id).checked);
        });
    }

    function loop() {
        skip_videos();
        auto_advance();
        skip_intro();
        guess_practice();
        vocab_completer();
        show_column();
        sync_config();
    }

    function skip_videos() {
        if (is_checked('SkipVideosTickbox')) {
            click('.play-button');
            click('.video-close-button');
        }
    }

    function auto_advance() {
        console.log('AutoAdvanceTickbox checked:', is_checked('AutoAdvanceTickbox'));
        console.log('Activity title:', document.getElementById('activity-title').innerText);
        
        if (is_checked('AutoAdvanceTickbox') && document.getElementById('activity-title').innerText !== 'Quiz') {
            click('.footnav.goRight');
        }
    }

    function skip_intro() {
        if (is_checked('SkipIntroTickbox')) {
            try { window.frames[0].document.getElementById('invis-o-div').remove(); } catch (e) {}
        }
    }

    function guess_practice() {
        if (is_checked('GuessPracticeTickbox')) {
            try {
                const activity_title = document.getElementById('activity-title').innerText;
                if (activity_title === 'Assignment') return;

                if (['Instruction', 'Warm-Up', 'Practice'].includes(activity_title)) {
                    const options = window.frames[0].frames[0].document.getElementsByClassName('answer-choice-button');
                    if (options.length) {
                        options[Math.floor(Math.random() * options.length)].click();
                    }
                    try { window.frames[0].API.Frame.check(); } catch (e) {}
                }
            } catch (e) {}
        }
    }

    function vocab_completer() {
        if (is_checked('VocabCompleterTickbox') && document.getElementById('activity-title').innerText === 'Vocabulary') {
            try {
                window.frames[0].document.getElementsByClassName('word-textbox')[0].value = window.frames[0].document.getElementsByClassName('word-background')[0].innerText;
                for (const button of window.frames[0].document.getElementsByClassName('playbutton vocab-play')) {
                    button.click();
                }
                click('.uibtn.uibtn-blue.uibtn-arrow-next', window.frames[0].document);
            } catch (e) {}
        }
    }

    function show_column() {
        if (is_checked('ShowColumnTickbox')) {
            try { window.frames[0].frames[0].document.getElementsByClassName('right-column')[0].children[0].style.display = 'block'; } catch (e) {}
            try { window.frames[0].frames[0].document.getElementsByClassName('left-column')[0].children[0].style.display = 'block'; } catch (e) {}
        }
    }

    function is_checked(id) {
        return document.getElementById(id).checked;
    }

    function click(selector, parent = document) {
        try { (parent || document).querySelector(selector).click(); } catch (e) {}
    }
})();
