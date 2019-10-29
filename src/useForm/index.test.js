import React from 'react';
import { act } from 'react-dom/test-utils';
import { mount } from 'enzyme';

import useForm from '.';
import expectExport from 'expect';


describe('Use Form', ()=>{
    let form, handleInputChange, handleChange, reset, handleError, clearError;
    beforeEach(()=>{
        testHook(()=>{
            const init = { username: '' };
            const formResult = useForm(init);
            form = formResult.form;
            handleInputChange = formResult.handleInputChange;
            handleChange = formResult.handleChange;
            reset = formResult.reset;
            handleError = formResult.handleError;
            clearError = formResult.clearError;
        });
    });

    it('should have form', ()=>{
        expect(form).toBeInstanceOf(Object);
    });

    it('should have handleInputChange', ()=>{
        expect(handleInputChange).toBeInstanceOf(Function);
    });

    it('should have handleChange', ()=>{
        expect(handleChange).toBeInstanceOf(Function);
    });

    it('should have reset', ()=>{
        expect(reset).toBeInstanceOf(Function);
    });

    it('should have handleError', ()=>{
        expect(handleError).toBeInstanceOf(Function);
    });

    it('should have blank username', ()=>{
        expect(form.username).toBe('');
    });

    it('should populate then clear', ()=>{
        expect(form.username).toBe('');
        act(()=>{
            const event = { target: { name: 'username', value: 'name'}};
            const error = new Error('Some error');
            handleInputChange(event);
            handleChange({ error, loading: true });
        }); 
        expect(form.username).toBe('name');
        expect(form.error).toBeInstanceOf(Error);
        expect(form.error.message).toBe('Some error');
        expect(form.loading).toBe(true);

        act(()=>{
            reset();
        });
        expect(form.username).toBe('');
        expect(form.error).toBeUndefined();
        expect(form.loading).toBeUndefined();
    });

    it('should hanndle an error', ()=>{
        act(()=>{
            const error = new Error('Some error');
            handleError({ error });
        }); 
        expect(form.error).toBeInstanceOf(Error);
        expect(form.error.message).toBe('Some error');
    });

    it('should hanndle an error then remove it', ()=>{
        act(()=>{
            const error = new Error('Some error');
            handleError({ error });
        }); 
        expect(form.error).toBeInstanceOf(Error);
        expect(form.error.message).toBe('Some error');

        act(()=>{
            clearError();
        });

        expect(form.error).toBeUndefined();     
    });
});


const HookTester = ({ cb }) => {
    cb();
    return null;
}

const testHook = (cb) => {
    mount(<HookTester cb={cb} />);
}