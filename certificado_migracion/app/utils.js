// Test names

function getName(){
    const names = ["Mary","Anna","Emma","Elizabeth","Minnie","Margaret","Ida","Alice","Bertha","Sarah","Annie","Clara","Ella","Florence","Cora","Martha","Laura","Nellie","Grace","Carrie","Maude","Mabel","Bessie","Jennie","Gertrude","Julia","Hattie","Edith","Mattie","Rose","John","William","James","Charles","George","Frank","Joseph","Thomas","Henry","Robert","Edward","Harry","Walter","Arthur","Fred","Albert","Samuel","David","Louis"];
    return toString(names[getRandomInt(0, names.length)])
}

function getSurname() {
    const surnames = ["Smith","Johnson","Williams","Brown","Jones","Miller","Davis","Garcia","Rodriguez","Wilson","Martinez","Anderson","Taylor","Thomas","Hernandez","Moore","Martin","Jackson","Thompson","White","Lopez","Lee","Gonzalez","Harris","Clark","Lewis","Robinson","Walker","Perez","Hall","Young","Allen","Sanchez","Wright","King","Scott","Green","Baker","Adams","Nelson","Hill","Ramirez","Campbell","Mitchell","Roberts","Carter"];
    return toString(surnames[getRandomInt(0, surnames.length)])
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function getRandomMark() {
    var precision = 10; // 2 decimals
    return Math.floor(Math.random() * (10 * precision - 1 * precision) + 1 * precision) / (1*precision);
}

function getRandomBool() {
    return Math.random() >= 0.5;
}

function toString(value) {
    return `${value}`;
}
