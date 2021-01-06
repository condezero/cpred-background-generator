export default {
    d10: function(){
        let max = 9;
        let min = 0;
        return Math.floor(Math.random() * max + min);
    },   
    d6: function() {
        let max = 5;
        let min = 0;
        return Math.floor(Math.random() * max + min);
    }
}