import {reactive} from "../reactive";
import {effect} from "../effect";
describe('effect',()=>{
    it('happy path', function () {
         const user = reactive({
             age:10
         });
        let nextAge;
        effect(()=>{
            nextAge = user.age+1
        });

        expect(nextAge).toBe(11);
        //update操作
        //测试依赖收集
        user.age++;
        expect(nextAge).toBe(12)

    });
})