import { mount } from '@vue/test-utils'
import Component from '../src/linkarea'

describe('linkarea 测试', () => {
  const wrapper = mount(Component,{
    propsData:{
      loCode: '',
      level: 4
    }
  })

  it('检查初始化数据渲染', () => {
    expect(wrapper.contains('.picker-province')).toBe(true);
    expect(wrapper.contains('.picker-city')).toBe(true);
    expect(wrapper.contains('.picker-county')).toBe(true);
    expect(wrapper.contains('.picker-road')).toBe(true);
    expect(wrapper.props().loCode).toBe('');
    expect(wrapper.props().level).toBe(4);
  });
  
  it('检查level无效时显示层级是否正确', () => {
    //负数参数无效，默认4级
    wrapper.setProps({level:-1});
    expect(wrapper.contains('.picker-province')).toBe(true);
    expect(wrapper.contains('.picker-city')).toBe(true);
    expect(wrapper.contains('.picker-county')).toBe(true);
    expect(wrapper.contains('.picker-road')).toBe(true);
    //参数0无效，默认4级
    wrapper.setProps({level:0});
    expect(wrapper.contains('.picker-province')).toBe(true);
    expect(wrapper.contains('.picker-city')).toBe(true);
    expect(wrapper.contains('.picker-county')).toBe(true);
    expect(wrapper.contains('.picker-road')).toBe(true);
    //参数null无效，默认4级
    wrapper.setProps({level:null});
    expect(wrapper.contains('.picker-province')).toBe(true);
    expect(wrapper.contains('.picker-city')).toBe(true);
    expect(wrapper.contains('.picker-county')).toBe(true);
    expect(wrapper.contains('.picker-road')).toBe(true);
    //参数小于1无效，默认4级
    wrapper.setProps({level:0.2});
    expect(wrapper.contains('.picker-province')).toBe(true);
     expect(wrapper.contains('.picker-city')).toBe(true);
     expect(wrapper.contains('.picker-county')).toBe(true);
     expect(wrapper.contains('.picker-road')).toBe(true);
  });

  it('检查level有效时显示层级是否正确', () => {
    //参数1有效，只显示省级
    wrapper.setProps({level:1});
    expect(wrapper.contains('.picker-province')).toBe(true);
    expect(wrapper.contains('.picker-city')).toBe(false);
    expect(wrapper.contains('.picker-county')).toBe(false);
    expect(wrapper.contains('.picker-road')).toBe(false);
    //参数2有效，显示省、市级
    wrapper.setProps({level:2});
    expect(wrapper.contains('.picker-province')).toBe(true);
    expect(wrapper.contains('.picker-city')).toBe(true);
    expect(wrapper.contains('.picker-county')).toBe(false);
    expect(wrapper.contains('.picker-road')).toBe(false);
     //参数3有效，显示省、市、区级
     wrapper.setProps({level:3});
     expect(wrapper.contains('.picker-province')).toBe(true);
     expect(wrapper.contains('.picker-city')).toBe(true);
     expect(wrapper.contains('.picker-county')).toBe(true);
     expect(wrapper.contains('.picker-road')).toBe(false);
     //参数大于4有效，显示4级
    wrapper.setProps({level:4});
    expect(wrapper.contains('.picker-province')).toBe(true);
    expect(wrapper.contains('.picker-city')).toBe(true);
    expect(wrapper.contains('.picker-county')).toBe(true);
    expect(wrapper.contains('.picker-road')).toBe(true);
    wrapper.setProps({level:5});
    expect(wrapper.contains('.picker-province')).toBe(true);
    expect(wrapper.contains('.picker-city')).toBe(true);
    expect(wrapper.contains('.picker-county')).toBe(true);
    expect(wrapper.contains('.picker-road')).toBe(true);
  });

  it('检查level为小数时显示层级是否正确', () => {
    //参数为大于1的小数，向下取整
    wrapper.setProps({level:1.2});
    expect(wrapper.contains('.picker-province')).toBe(true);
    expect(wrapper.contains('.picker-city')).toBe(false);
    expect(wrapper.contains('.picker-county')).toBe(false);
    expect(wrapper.contains('.picker-road')).toBe(false);
    wrapper.setProps({level:2.5});
    expect(wrapper.contains('.picker-province')).toBe(true);
    expect(wrapper.contains('.picker-city')).toBe(true);
    expect(wrapper.contains('.picker-county')).toBe(false);
    expect(wrapper.contains('.picker-road')).toBe(false);
    wrapper.setProps({level:3.4});
    expect(wrapper.contains('.picker-province')).toBe(true);
    expect(wrapper.contains('.picker-city')).toBe(true);
    expect(wrapper.contains('.picker-county')).toBe(true);
    expect(wrapper.contains('.picker-road')).toBe(false);
    wrapper.setProps({level:4.5});
    expect(wrapper.contains('.picker-province')).toBe(true);
    expect(wrapper.contains('.picker-city')).toBe(true);
    expect(wrapper.contains('.picker-county')).toBe(true);
    expect(wrapper.contains('.picker-road')).toBe(true);
  });

  it('检查省级loCode回显是否正确', ()=> {
    //正确编码
    wrapper.setProps({loCode:'11'});
    expect(wrapper.html()).toContain('北京市');
    //错误编码
    wrapper.setProps({loCode:'10'});
    expect(wrapper.html()).toContain('请选择省');
  });

  it('检查市级loCode回显是否正确', ()=> {
    //正确编码
    wrapper.setProps({loCode:'1101'});
    expect(wrapper.html()).toContain('北京市');
    expect(wrapper.html()).toContain('市辖区');
    //错误编码
    wrapper.setProps({loCode:'1001'});
    expect(wrapper.html()).toContain('请选择省');
    expect(wrapper.html()).toContain('请选择市');
  });

  it('检查区级loCode回显是否正确', ()=> {
    //正确编码
    wrapper.setProps({loCode:'110101'});
    expect(wrapper.html()).toContain('北京市');
    expect(wrapper.html()).toContain('市辖区');
    expect(wrapper.html()).toContain('东城区');
    //错误编码
    wrapper.setProps({loCode:'100101'});
    expect(wrapper.html()).toContain('请选择省');
    expect(wrapper.html()).toContain('请选择市');
    expect(wrapper.html()).toContain('请选择区');
  });

  it('检查街道loCode回显是否正确', ()=> {
    //正确编码
    wrapper.setProps({loCode:'110101015'});
    expect(wrapper.html()).toContain('北京市');
    expect(wrapper.html()).toContain('市辖区');
    expect(wrapper.html()).toContain('东城区');
    expect(wrapper.html()).toContain('体育馆路街道');
    //错误编码
    wrapper.setProps({loCode:'100101015'});
    expect(wrapper.html()).toContain('请选择省');
    expect(wrapper.html()).toContain('请选择市');
    expect(wrapper.html()).toContain('请选择区');
    expect(wrapper.html()).toContain('请选择街道');
  });

  it('检查loCode前半部分正确时回显是否正确', ()=> {
    //前1级部分正确编码
    wrapper.setProps({loCode:'110000000'});
    expect(wrapper.html()).toContain('北京市');
    expect(wrapper.html()).toContain('请选择市');
    expect(wrapper.html()).toContain('请选择区');
    expect(wrapper.html()).toContain('请选择街道');
    //前2级部分正确编码
    wrapper.setProps({loCode:'110100000'});
    expect(wrapper.html()).toContain('北京市');
    expect(wrapper.html()).toContain('市辖区');
    expect(wrapper.html()).toContain('请选择区');
    expect(wrapper.html()).toContain('请选择街道');
    //前3级部分正确编码
    wrapper.setProps({loCode:'110101000'});
    expect(wrapper.html()).toContain('北京市');
    expect(wrapper.html()).toContain('市辖区');
    expect(wrapper.html()).toContain('东城区');
    expect(wrapper.html()).toContain('请选择街道');
  });

  it('检查点击省级部分是否显示下拉列表', () => {
    //列表未显示
    expect(wrapper.vm.showList).toBe(false);
    //点击span后列表显示
    wrapper.find('.picker-province').trigger('click');
    expect(wrapper.vm.showList).toBe(true);
    expect(wrapper.html()).toContain('省');
  });

  it('检查点击市级部分是否显示下拉列表', () => {
    wrapper.vm.showList = false;
    //点击span后列表显示
    wrapper.find('.picker-city').trigger('click');
    expect(wrapper.vm.showList).toBe(true);
  });

  it('检查点击区级部分是否显示下拉列表', () => {
    wrapper.vm.showList = false;
    //点击span后列表显示
    wrapper.find('.picker-county').trigger('click');
    expect(wrapper.vm.showList).toBe(true);
  });

  it('检查点击街道部分是否显示下拉列表', () => {
    wrapper.vm.showList = false;
    //点击span后列表显示
    wrapper.find('.picker-road').trigger('click');
    expect(wrapper.vm.showList).toBe(true);
  });

  it('检查点击省级下拉列表选项时是否正确显示', () => {
    //点击span后列表显示
    wrapper.find('.picker-province').trigger('click');
    expect(wrapper.vm.showList).toBe(true);
    //点击第一个li
    let li = wrapper.find('li');
    li.trigger('click');
    expect(wrapper.html()).toContain('北京市');
    //列表自动切换为市级列表
    expect(wrapper.vm.showList).toBe(true);
    expect(wrapper.html()).toContain('市辖区');
  });

  it('检查点击市级下拉列表选项时是否正确显示', () => {
    //点击span后列表显示
    wrapper.find('.picker-city').trigger('click');
    expect(wrapper.vm.showList).toBe(true);
    //点击第一个li
    let li = wrapper.find('li');
    li.trigger('click');
    expect(wrapper.html()).toContain('市辖区');
    //列表自动切换为区级列表
    expect(wrapper.vm.showList).toBe(true);
    expect(wrapper.html()).toContain('东城区');
  });

  it('检查点击区级下拉列表选项时是否正确显示', () => {
    //点击span后列表显示
    wrapper.find('.picker-county').trigger('click');
    expect(wrapper.vm.showList).toBe(true);
    //点击第一个li
    let li = wrapper.find('li');
    li.trigger('click');
    expect(wrapper.html()).toContain('东城区');
    //列表自动切换为街道列表
    expect(wrapper.vm.showList).toBe(true);
    expect(wrapper.html()).toContain('东华门街道');
  });

  it('检查点击街道级下拉列表选项时是否正确显示', () => {
    //点击span后列表显示
    wrapper.find('.picker-road').trigger('click');
    expect(wrapper.vm.showList).toBe(true);
    //点击第一个li
    let li = wrapper.find('li');
    li.trigger('click');
    expect(wrapper.html()).toContain('东华门街道');
    //列表自动隐藏
    expect(wrapper.vm.showList).toBe(false);
  });

  it('检查越级点击时下拉列表是否不变', () => {
    //场景1：先点击省级span
    wrapper.find('.picker-province').trigger('click');
    expect(wrapper.vm.showList).toBe(true);
    //点击第一个li
    let li = wrapper.find('li');
    li.trigger('click');
    expect(wrapper.html()).toContain('市辖区');
    //然后点击区级/街道级span
    wrapper.find('.picker-county').trigger('click');
    expect(wrapper.html()).toContain('市辖区');
    wrapper.find('.picker-road').trigger('click');
    expect(wrapper.html()).toContain('市辖区');

    //场景2 点击市级span
    wrapper.find('.picker-city').trigger('click');
    expect(wrapper.vm.showList).toBe(true);
    //点击第一个li
    li = wrapper.find('li');
    li.trigger('click');
    expect(wrapper.html()).toContain('东城区');
    //然后点击街道级span
    wrapper.find('.picker-road').trigger('click');
    expect(wrapper.html()).toContain('东城区');
  })
})
