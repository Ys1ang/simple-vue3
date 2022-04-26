import {readonly} from "../reactive";


describe('readonly',()=>{
    it('happy path',()=>{
        const original = {
            foo:1,
            bar:{baz:2}
        };
        const observed = readonly(original);
        let wrapped = readonly(original);
        expect(wrapped).not.toBe(original)
        expect(wrapped.foo).toBe(1)

    })
})