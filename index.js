var request = require('request');

var _lookup = () => {

    return {

        getRunescapeCommands: () => {
            return ['vos'];
        },

        processRunescapeMessage: (author, commandLine, command, split, discordQueue, runescapeQueue) => {
            request('https://twitter.com/search?f=tweets&vertical=default&q=from%3Ajagexclock&src=typd', (err, response, body) => {
                if (err) {
                    runescapeQueue.push(['Error parsing Voice of Seren data.', undefined, new Date()]);
                    return;
                }
                body = body.replace(/\n/g, '');
                body = body.replace(/\t/g, '');
                var found = body.match(/(?<=\<p class="TweetTextSize  js-tweet-text tweet-text" lang="en" data-aria-label-part="0"\>)(.*?)(?=\<\/p\>)/);
                if (!found) {
                    runescapeQueue.push(['Error parsing Voice of Seren data.', undefined, new Date()]);
                    return;
                }
                found = found[0].substring(0, found[0].indexOf(' at'));
                found += '.';
                runescapeQueue.push([found, undefined, new Date()]);
            });
        }

    };

};
module.exports = _lookup;