import Database from "@/database";

function Character(settings) {
    let return_obj = {};
    let role = settings.role || getRandom("roles");
    return_obj ={
        role
    }
}
function getRandom(database, sub) {
    let item = undefined;
    try {
        let d = Database[database] || Database[database + "s"];
        if(sub)
        {
            d = d[sub];
        }
        if (d.length) {
            let index = random(d.length);
            item = d[index];
        } else if (typeof d == "object") {
            let keys = Object.keys(d);
            let key = keys[random(keys.length)];
            item = {
                name: key,
                ...d[key]
            };
        }
    } catch (e) {
        console.error(e);
    }
    // console.debug(item);
    return item;
}