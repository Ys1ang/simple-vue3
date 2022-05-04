import {isProxy, isReadonly, reactive, readonly} from "../reactive";
import {isRef, proxyRefs, ref, unRef} from "../ref";
import {effect} from "../effect";


describe('readonly', () => {
    it('happy path', () => {
        const a = ref(1);
        expect(a.value).toBe(1)
    })
    it('should be reactive', function () {
        const a = ref(1);
        let dummy;
        let calls = 0;
        effect(() => {
            calls++;
            dummy = a.value
        })
        expect(calls).toBe(1);
        expect(dummy).toBe(1);
        a.value = 2;
        expect(calls).toBe(2);
        expect(dummy).toBe(2);
        a.value = 2;
        expect(calls).toBe(2);
        expect(dummy).toBe(2);
    });

    it('should make nested properties reactive', function () {
        const a = ref({count: 1});
        let dummy;

        effect(() => {
            dummy = a.value.count;
        })
        expect(dummy).toBe(1);
        a.value.count = 2;
        expect(dummy).toBe(2);
    });

    it(' isRef', function () {
        const a = reactive({count: 1});
        const b = ref(1);
        expect(isRef(a)).toBe(false)
        expect(isRef(1)).toBe(false)
        expect(isRef(b)).toBe(true)
    });
    it(' unRef', function () {
        const a = ref(1);
        expect(unRef(a)).toBe(1)
        expect(unRef(1)).toBe(1)
    });

    it('proxyRefs', function () {

        const user = {
            age: ref(10),
            name: 'JoJo'
        }
        //test get
        const proxyUser = proxyRefs(user)
        expect(user.age.value).toBe(10);
        expect(proxyUser.age).toBe(10);
        expect(proxyUser.name).toBe('JoJo');
        //test set
        proxyUser.age = 20;
        expect(proxyUser.age).toBe(20);
        expect(user.age.value).toBe(20);
    });
})