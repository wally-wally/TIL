const numUniqueEmails = (emails) => {
  // emails의 길이가 1이면 무조건 1로 return
  if (emails.length === 1) {
    return 1;
  }

  const regenerateEmailAddress = (email) => {
    // '@' 기준으로 local name, domain name 분리
    let [ localName, domainName ] = email.split('@');

    // local name에서 '.' 기호는 모두 제거
    localName = localName.replace(/\./g, '');

    // local name에서 첫 번째 '+' 기호를 기준으로 뒷 부분은 모두 제거
    if (localName.includes('+')) {
      const firstPlusSignIndex = localName.indexOf('+');
      localName = localName.slice(0, firstPlusSignIndex);
    }

    return `${localName}@${domainName}`;
  }

  return new Set(emails.map(regenerateEmailAddress)).size;
}

console.log(numUniqueEmails(['test.email+alex@leetcode.com', 'test.e.mail+bob.cathy@leetcode.com', 'testemail+david@lee.tcode.com'])); // 2
console.log(numUniqueEmails(['a@leetcode.com', 'b@leetcode.com', 'c@leetcode.com'])); // 3
console.log(numUniqueEmails(['test.email+alex@leetcode.com', 'test.email@leetcode.com'])); // 1
console.log(numUniqueEmails(['test.email+alex@leetcode.com','test.email.leet+alex@code.com'])); // 2