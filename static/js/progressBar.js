/**
 * 进度条
 */

define(['jquery'],function($){
    var generate = function(obj,percent){
        $(obj).find(".progressBarBar").css("width",percent);
    };

    return{
        'generate':generate
    }

})
