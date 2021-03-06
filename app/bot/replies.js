"use strict"

var _ = require("lodash-node");
var Set = require("collections/set");
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
// TODO read from CSV file?

var replyData = [
    {
        regex: /help/i,
        reply: "what can i help you with?"
    },

    {
        regex: /how are you/i,
        // reply: "I'm great, and you?"
        reply: "I'm great. Nice talking to you, I am an ORBITZ robot, you can ask me anything."
    },
    {
	   regex: /hi/i,
	   reply: "Hi, there, how are you?"
	},
    {
        regex: /travel/i,
        reply: "You found the right one, I am a travel expert."
    },

    {
        regex: /english/i,
        reply: "Do you speak it?"
    },

];

var replies = {
    find: function(input) {
         
        var location = ["chicago", "new york", "seattle", "los angeles", "houston",
        "philadelphia", "phoenix", "san antonio", "san diego", "las vegas", "dallas",
        "san jose", "austin", "columbus", "boston", "detroit", "honolulu", "long beach"];
        var locationMap = new Set(location);
        var recommendation = ["activities", "recommendation", "tour"];
        var recommendationMap = new Set(recommendation);
        input=input.toLowerCase();
        input=input.replace(/@#\$%\^&\*\(\)_\+=~`\{\[\}\]\|:;<>\/\\\t,/g, ' ');
        input = input.replace(/\s+/g, " ");
        // input=input.replace(/\s+-+\s+/g, '.');
        // input=input.replace(/\s*[,\.\?!;]+\s*/g, '.');
        // input=input.replace(/\s*\bbut\b\s*/g, '.');
        // input=input.replace(/\s{2,}/g, ' ');

    // split input in part sentences and loop through them
        var parts=input.split(' ');
        var output = null;
        var locationFlag = 1;
        for (var i=0; i<parts.length; i++) {
           locationFlag = 1;
         console.log("parts:" + parts[i]);
             if (locationMap.has(parts[i])) {
                // console.log("found");
                output = parts[i];
                locationFlag = 0;
                break;
             } else if (i + 1 < parts.length && locationMap.has(parts[i] + " " + parts[i+1])){
                output = parts[i] + parts[i+1];
                locationFlag = 0;
                break;
             } 
        }
        for (i=0; i<parts.length; i++) { 
            if (locationFlag == 0 && recommendationMap.has(parts[i])) {

                var url = "http://terminal2.expedia.com/x/activities/search?location=" + output + "&apikey=i1uIMsabJljtHYfUCvRsSe0jqm4R1nL1";
                var Httpreq = new XMLHttpRequest();
                Httpreq.open("GET", url, false);
                Httpreq.send(null);
                var json = Httpreq.responseText;
                var obj = JSON.parse(json);
                console.log(obj.activities[0].title);
                return "I have found those tour for you:" + "1. " + obj.activities[0].title + " 2. " + obj.activities[1].title;
            } 
        }
        if(locationFlag == 0) return "click this link, I already help you find all the hotels in this area: www.expedia.com/go?type=Hotel-Search&destination=" + output;
        var res = replyData.filter(function(one) {
            return one.regex.test(input);//test if there is a match
        });
        var one = _.sample(res);
        if (one) {
            return one.reply;
            //return one.fn(input);
        }
        // console.log("input:" + input);

       
        return output;
    }
};

module.exports = replies;
