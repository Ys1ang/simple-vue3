import {reactive} from "../reactive";
import {effect, stop} from "../effect";

describe('effect', () => {
    it('happy path', function () {
        const user = reactive({
            age: 10
        });
        let nextAge;
        effect(() => {
            nextAge = user.age + 1
        });
        expect(nextAge).toBe(11);
        //update操作
        //测试依赖收集
        user.age++;
        expect(nextAge).toBe(12)

    });

    it('scheduler', () => {
        let dummy
        let run: any
        const scheduler = jest.fn(() => {
            run = runner
        })
        const obj = reactive({foo: 1})
        const runner = effect(
            () => {
                dummy = obj.foo
            },
            {scheduler}
        )
        expect(scheduler).not.toHaveBeenCalled()
        expect(dummy).toBe(1)
        // should be called on first trigger
        obj.foo++
        expect(scheduler).toHaveBeenCalledTimes(1)
        // should not run yet
        expect(dummy).toBe(1)
        // manually run
        run()
        // should have run
        expect(dummy).toBe(2)
    })

    it('stop', () => {
        let dummy
        const obj = reactive({prop: 1})
        const runner = effect(() => {
            dummy = obj.prop
        })
        obj.prop = 2
        expect(dummy).toBe(2)
        stop(runner)
        obj.prop = 3
        expect(dummy).toBe(2)
        // stopped effect should still be manually callable
        runner()
        expect(dummy).toBe(3)
    })


    it('onStop', () => {
        const obj = reactive({foo: 1});
        let onStop = jest.fn();
        let dummy;
         const runner =effect(()=>{
             dummy = obj.foo
         },{onStop})
        stop(runner);
        expect(onStop).toBeCalledTimes(1);
    })


})


