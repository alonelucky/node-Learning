class Person{
    constructor(name,sex){
        this.name=name;
        this.sex=sex;
    }

    hi(){
        console.log('I am a Person,my name is '+this.name);
    }

}


class Student extends Person{

    constructor(name,sex,c,g){
        super(name,sex);
        this.class=c;
        this.grade=g;
    }

    hello(){
        console.log('I am a student,my class is '+this.class);
    }
}


var xiaohong = new Person('xiaohong','nv');
var xiaogang =  new Student('4','3');

xiaohong.hi();
xiaogang.hi();
xiaogang.hello();