const solution = (table, languages, preference) => {
  const preferenceData = languages.reduce((data, language, index) => {
    return {
      ...data,
      [language]: preference[index],
    }
  }, {});

  const preferenceMap = table.reduce((map, str) => {
    const [jobGroup, ...jobGroupLanguages] = str.split(' ');

    const preferenceSum = jobGroupLanguages.reduce((acc, jobGroupLanguage, index) => {
      if (languages.includes(jobGroupLanguage)) {
        return acc + preferenceData[jobGroupLanguage] * (5 - index);
      }

      return acc;
    }, 0);

    return {
      ...map,
      [jobGroup]: preferenceSum,
    }
  }, {});


  const sortedLanguagePreference = Object.entries(preferenceMap).sort((a, b) => b[1] - a[1] - (a[0] < b[0]));

  return sortedLanguagePreference[0][0];
}

console.log(solution(
  ["SI JAVA JAVASCRIPT SQL PYTHON C#",
   "CONTENTS JAVASCRIPT JAVA PYTHON SQL C++",
   "HARDWARE C C++ PYTHON JAVA JAVASCRIPT",
   "PORTAL JAVA JAVASCRIPT PYTHON KOTLIN PHP",
   "GAME C++ C# JAVASCRIPT C JAVA"
  ],
  ["PYTHON", "C++", "SQL"],
  [7, 5, 5]
)); // "HARDWARE"
console.log(solution(
  ["SI JAVA JAVASCRIPT SQL PYTHON C#",
   "CONTENTS JAVASCRIPT JAVA PYTHON SQL C++",
   "HARDWARE C C++ PYTHON JAVA JAVASCRIPT",
   "PORTAL JAVA JAVASCRIPT PYTHON KOTLIN PHP",
   "GAME C++ C# JAVASCRIPT C JAVA"
  ],
  ["JAVA", "JAVASCRIPT"],
  [7, 5]
)); // "PORTAL"