// 비공개 생성자를 통한 열거

// before
// 열거형
// enum TShirtSize {
//   SMALL,
//   MEDIUM,
//   LARGE,
// }

// 비공개 생성자
// class TShirtSize {
//   static readonly SMALL = new TShirtSize();
//   static readonly MEDIUM = new TShirtSize();
//   static readonly LARGE = new TShirtSize();
//   private constructor() {}
// }

function sizeToString(s: TShirtSize) {
  if (s === TShirtSize.SMALL) {
    return "S";
  } else if (s === TShirtSize.MEDIUM) {
    return "M";
  } else if (s === TShirtSize.LARGE) {
    return "L";
  }
}

// after
// 문제점1) 모든 프로그래밍 언어 특히 자바에서 동일하게 적용되지 않는다.
// 문제점2) 이미 열거형을 제거하기 위한 패턴을 가지고 있으며 구것이 우선적으로 적용되어야 한다.
interface SizeValue {}
class SmallValue implements SizeValue {}
class MediumValue implements SizeValue {}
class LargeValue implements SizeValue {}

class TShirtSize {
  static readonly SMALL = new TShirtSize(new SmallValue());
  static readonly MEDIUM = new TShirtSize(new MediumValue());
  static readonly LARGE = new TShirtSize(new LargeValue());
  private constructor(private value: SizeValue) {}
}
