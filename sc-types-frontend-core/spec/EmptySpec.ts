import {expectType} from 'tsd-check';

describe('empty', ()=>{
    it('empty spec', ()=>{
        expectType<1>(1);
    })
})