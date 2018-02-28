import { DiscountFormatterPipe } from './discount-formatter.pipe';

describe('DiscountFormatterPipe', () => {
  it('creates an instance', () => {
    const pipe = new DiscountFormatterPipe();
    expect(pipe).toBeTruthy();
  });

  it('should not transform null value', () => {
    const pipe = new DiscountFormatterPipe();
    expect(pipe.transform(null, 10)).toEqual(null);
  });

  it('should transform price with a discount', () => {
    const pipe = new DiscountFormatterPipe();
    expect(pipe.transform(50, 10)).toEqual('You save <del>50</del> <b>40</b>');
  });
});
