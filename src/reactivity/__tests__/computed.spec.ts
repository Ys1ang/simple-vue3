import {reactive} from "../reactive";
import {computed} from "../computed";

describe('computed', () => {
    it('happy path', function () {
        //基本逻辑，无缓存
        const user = reactive({
            age: 10
        });
        const age = computed(() => {
            return user.age
        });
        expect(age.value).toBe(10)
    });


    // 懒执行
    it('should compute lazily', function () {
        const value = reactive({foo: 1});
        const getter = jest.fn(() => {
            return value.foo
        })
        const cValue = computed(getter);
        expect(getter).not.toHaveBeenCalled()
        expect(cValue.value).toBe(1);
        expect(getter).toHaveBeenCalledTimes(1);
        //get cValue getter调用次数应该为1;
        cValue.value;
        expect(getter).toHaveBeenCalledTimes(1);
        value.foo = 2;
        expect(getter).toHaveBeenCalledTimes(1);
        cValue.value;
        expect(getter).toHaveBeenCalledTimes(2);
    });
})


