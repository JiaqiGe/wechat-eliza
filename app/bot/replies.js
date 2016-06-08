"use strict"

var _ = require("lodash-node");
var Set = require("collections/set");
// TODO read from CSV file?

var replyData = [
    {
        regex: /help/i,
        reply: "what can i help you with?"
    },

    {
        regex: /how are you/i,
        // reply: "I'm great, and you?"
        reply: "I'm great, and you?"
    },

    {
        regex: /english/i,
        reply: "Do you speak it?"
    },

];

var replies = {
    find: function(input) {
        // var res = replyData.filter(function(one) {
        //     return one.regex.test(input);//test if there is a match
        // });
        // var one = _.sample(res);
        // if (one) {
        //     return one.reply;
        //     //return one.fn(input);
        // }
        // console.log("input:" + input);
        var location = ["chicago", "new york", "seattle", "los angeles", "houston",
        "philadelphia", "phoenix", "san antonio", "san diego", "las vegas", "dallas",
        "san jose", "austin", "columbus", "boston", "detroit", "honolulu", "long beach"];
        var locationMap = new Set(location);
        input=input.toLowerCase();
        input=input.replace(/@#\$%\^&\*\(\)_\+=~`\{\[\}\]\|:;<>\/\\\t,/g, ' ');
        input = input.replace(/\s+/g, " ");
        // input=input.replace(/\s+-+\s+/g, '.');
        // input=input.replace(/\s*[,\.\?!;]+\s*/g, '.');
        // input=input.replace(/\s*\bbut\b\s*/g, '.');
        // input=input.replace(/\s{2,}/g, ' ');

    // split input in part sentences and loop through them
        var parts=input.split(' ');
        for (var i=0; i<parts.length; i++) {
            console.log("parts:" + parts[i]);
             if (locationMap.has(parts[i])) {
                // console.log("found");
                return parts[i];
             } else if (i + 1 < parts.length && locationMap.has(parts[i] + " " + parts[i+1])){
                return parts[i] + " " + parts[i+1];
             }
        }
        return null;
    }
};

module.exports = replies;