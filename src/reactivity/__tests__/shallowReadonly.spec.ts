import {isReadonly, readonly, shallowReadonly} from "../reactive";

describe('shallowReadonly', () => {
    it('should be shallowReadonly', function () {
        const props = shallowReadonly({foo: 1});
        expect(isReadonly(props)).toBe(true)
        expect(isReadonly(props.foo)).toBe(false)
    });
    it('warn then call set', () => {
        console.warn = jest.fn();
        const user = readonly({
            age: 10
        })
        user.age = 11;
        expect(console.warn).toBeCalled();
    })
})