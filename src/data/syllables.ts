import type { Syllable } from '../types';

export const CONSONANTS = [
  'B', 'C', 'Ć', 'CZ', 'D', 'DZ', 'DŻ', 'DŹ', 'F', 'G', 'H', 'J', 'K', 'L', 'Ł',
  'M', 'N', 'Ń', 'P', 'R', 'RZ', 'S', 'Ś', 'SZ', 'T', 'W', 'Z', 'Ź', 'Ż'
];

export const ALL_SYLLABLES: Syllable[] = [
  // --- B ---
  { id: 1, text: 'BA', consonant: 'B', audioUrl: '/audio/ba.mp3' },
  { id: 2, text: 'BE', consonant: 'B', audioUrl: '/audio/be.mp3' },
  { id: 3, text: 'BI', consonant: 'B', audioUrl: '/audio/bi.mp3' },
  { id: 4, text: 'BO', consonant: 'B', audioUrl: '/audio/bo.mp3' },
  { id: 5, text: 'BU', consonant: 'B', audioUrl: '/audio/bu.mp3' },
  { id: 6, text: 'BY', consonant: 'B', audioUrl: '/audio/by.mp3' },

  // --- C ---
  { id: 7, text: 'CA', consonant: 'C', audioUrl: '/audio/ca.mp3' },
  { id: 8, text: 'CE', consonant: 'C', audioUrl: '/audio/ce.mp3' },
  { id: 9, text: 'CI', consonant: 'C', audioUrl: '/audio/ci.mp3' },
  { id: 10, text: 'CO', consonant: 'C', audioUrl: '/audio/co.mp3' },
  { id: 11, text: 'CU', consonant: 'C', audioUrl: '/audio/cu.mp3' },
  { id: 12, text: 'CY', consonant: 'C', audioUrl: '/audio/cy.mp3' },

  // --- Ć ---
  { id: 13, text: 'ĆA', consonant: 'Ć', audioUrl: '/audio/cia.mp3' },
  { id: 14, text: 'ĆE', consonant: 'Ć', audioUrl: '/audio/cie.mp3' },
  { id: 15, text: 'ĆI', consonant: 'Ć', audioUrl: '/audio/cii.mp3' },
  { id: 16, text: 'ĆO', consonant: 'Ć', audioUrl: '/audio/cio.mp3' },
  { id: 17, text: 'ĆU', consonant: 'Ć', audioUrl: '/audio/ciu.mp3' },
  { id: 18, text: 'ĆY', consonant: 'Ć', audioUrl: '/audio/ciy.mp3' },

  // --- CZ ---
  { id: 19, text: 'CZA', consonant: 'CZ', audioUrl: '/audio/cza.mp3' },
  { id: 20, text: 'CZE', consonant: 'CZ', audioUrl: '/audio/cze.mp3' },
  { id: 21, text: 'CZI', consonant: 'CZ', audioUrl: '/audio/czi.mp3' },
  { id: 22, text: 'CZO', consonant: 'CZ', audioUrl: '/audio/czo.mp3' },
  { id: 23, text: 'CZU', consonant: 'CZ', audioUrl: '/audio/czu.mp3' },
  { id: 24, text: 'CZY', consonant: 'CZ', audioUrl: '/audio/czy.mp3' },

  // --- D ---
  { id: 25, text: 'DA', consonant: 'D', audioUrl: '/audio/da.mp3' },
  { id: 26, text: 'DE', consonant: 'D', audioUrl: '/audio/de.mp3' },
  { id: 27, text: 'DI', consonant: 'D', audioUrl: '/audio/di.mp3' },
  { id: 28, text: 'DO', consonant: 'D', audioUrl: '/audio/do.mp3' },
  { id: 29, text: 'DU', consonant: 'D', audioUrl: '/audio/du.mp3' },
  { id: 30, text: 'DY', consonant: 'D', audioUrl: '/audio/dy.mp3' },

  // --- DZ ---
  { id: 31, text: 'DZA', consonant: 'DZ', audioUrl: '/audio/dza.mp3' },
  { id: 32, text: 'DZE', consonant: 'DZ', audioUrl: '/audio/dze.mp3' },
  { id: 33, text: 'DZI', consonant: 'DZ', audioUrl: '/audio/dzi.mp3' },
  { id: 34, text: 'DZO', consonant: 'DZ', audioUrl: '/audio/dzo.mp3' },
  { id: 35, text: 'DZU', consonant: 'DZ', audioUrl: '/audio/dzu.mp3' },
  { id: 36, text: 'DZY', consonant: 'DZ', audioUrl: '/audio/dzy.mp3' },

  // --- DŻ ---
  { id: 37, text: 'DŻA', consonant: 'DŻ', audioUrl: '/audio/dza.mp3' }, // Placeholder, often same as DZ
  { id: 38, text: 'DŻE', consonant: 'DŻ', audioUrl: '/audio/dze.mp3' },
  { id: 39, text: 'DŻI', consonant: 'DŻ', audioUrl: '/audio/dzi.mp3' },
  { id: 40, text: 'DŻO', consonant: 'DŻ', audioUrl: '/audio/dzo.mp3' },
  { id: 41, text: 'DŻU', consonant: 'DŻ', audioUrl: '/audio/dzu.mp3' },
  { id: 42, text: 'DŻY', consonant: 'DŻ', audioUrl: '/audio/dzy.mp3' },

  // --- DŹ ---
  { id: 43, text: 'DŹA', consonant: 'DŹ', audioUrl: '/audio/dzia.mp3' },
  { id: 44, text: 'DŹE', consonant: 'DŹ', audioUrl: '/audio/dzie.mp3' },
  { id: 45, text: 'DŹI', consonant: 'DŹ', audioUrl: '/audio/dzii.mp3' },
  { id: 46, text: 'DŹO', consonant: 'DŹ', audioUrl: '/audio/dzio.mp3' },
  { id: 47, text: 'DŹU', consonant: 'DŹ', audioUrl: '/audio/dziu.mp3' },
  { id: 48, text: 'DŹY', consonant: 'DŹ', audioUrl: '/audio/dziy.mp3' },

  // --- F ---
  { id: 49, text: 'FA', consonant: 'F', audioUrl: '/audio/fa.mp3' },
  { id: 50, text: 'FE', consonant: 'F', audioUrl: '/audio/fe.mp3' },
  { id: 51, text: 'FI', consonant: 'F', audioUrl: '/audio/fi.mp3' },
  { id: 52, text: 'FO', consonant: 'F', audioUrl: '/audio/fo.mp3' },
  { id: 53, text: 'FU', consonant: 'F', audioUrl: '/audio/fu.mp3' },
  { id: 54, text: 'FY', consonant: 'F', audioUrl: '/audio/fy.mp3' },

  // --- G ---
  { id: 55, text: 'GA', consonant: 'G', audioUrl: '/audio/ga.mp3' },
  { id: 56, text: 'GE', consonant: 'G', audioUrl: '/audio/ge.mp3' },
  { id: 57, text: 'GI', consonant: 'G', audioUrl: '/audio/gi.mp3' },
  { id: 58, text: 'GO', consonant: 'G', audioUrl: '/audio/go.mp3' },
  { id: 59, text: 'GU', consonant: 'G', audioUrl: '/audio/gu.mp3' },
  { id: 60, text: 'GY', consonant: 'G', audioUrl: '/audio/gy.mp3' },

  // --- H ---
  { id: 61, text: 'HA', consonant: 'H', audioUrl: '/audio/ha.mp3' },
  { id: 62, text: 'HE', consonant: 'H', audioUrl: '/audio/he.mp3' },
  { id: 63, text: 'HI', consonant: 'H', audioUrl: '/audio/hi.mp3' },
  { id: 64, text: 'HO', consonant: 'H', audioUrl: '/audio/ho.mp3' },
  { id: 65, text: 'HU', consonant: 'H', audioUrl: '/audio/hu.mp3' },
  { id: 66, text: 'HY', consonant: 'H', audioUrl: '/audio/hy.mp3' },

  // --- J ---
  { id: 67, text: 'JA', consonant: 'J', audioUrl: '/audio/ja.mp3' },
  { id: 68, text: 'JE', consonant: 'J', audioUrl: '/audio/je.mp3' },
  { id: 69, text: 'JI', consonant: 'J', audioUrl: '/audio/ji.mp3' },
  { id: 70, text: 'JO', consonant: 'J', audioUrl: '/audio/jo.mp3' },
  { id: 71, text: 'JU', consonant: 'J', audioUrl: '/audio/ju.mp3' },
  { id: 72, text: 'JY', consonant: 'J', audioUrl: '/audio/jy.mp3' },

  // --- K ---
  { id: 73, text: 'KA', consonant: 'K', audioUrl: '/audio/ka.mp3' },
  { id: 74, text: 'KE', consonant: 'K', audioUrl: '/audio/ke.mp3' },
  { id: 75, text: 'KI', consonant: 'K', audioUrl: '/audio/ki.mp3' },
  { id: 76, text: 'KO', consonant: 'K', audioUrl: '/audio/ko.mp3' },
  { id: 77, text: 'KU', consonant: 'K', audioUrl: '/audio/ku.mp3' },
  { id: 78, text: 'KY', consonant: 'K', audioUrl: '/audio/ky.mp3' },

  // --- L ---
  { id: 79, text: 'LA', consonant: 'L', audioUrl: '/audio/la.mp3' },
  { id: 80, text: 'LE', consonant: 'L', audioUrl: '/audio/le.mp3' },
  { id: 81, text: 'LI', consonant: 'L', audioUrl: '/audio/li.mp3' },
  { id: 82, text: 'LO', consonant: 'L', audioUrl: '/audio/lo.mp3' },
  { id: 83, text: 'LU', consonant: 'L', audioUrl: '/audio/lu.mp3' },
  { id: 84, text: 'LY', consonant: 'L', audioUrl: '/audio/ly.mp3' },

  // --- Ł ---
  { id: 85, text: 'ŁA', consonant: 'Ł', audioUrl: '/audio/la.mp3' }, // Same audio as L sometimes
  { id: 86, text: 'ŁE', consonant: 'Ł', audioUrl: '/audio/le.mp3' },
  { id: 87, text: 'ŁI', consonant: 'Ł', audioUrl: '/audio/li.mp3' },
  { id: 88, text: 'ŁO', consonant: 'Ł', audioUrl: '/audio/lo.mp3' },
  { id: 89, text: 'ŁU', consonant: 'Ł', audioUrl: '/audio/lu.mp3' },
  { id: 90, text: 'ŁY', consonant: 'Ł', audioUrl: '/audio/ly.mp3' },

  // --- M ---
  { id: 91, text: 'MA', consonant: 'M', audioUrl: '/audio/ma.mp3' },
  { id: 92, text: 'ME', consonant: 'M', audioUrl: '/audio/me.mp3' },
  { id: 93, text: 'MI', consonant: 'M', audioUrl: '/audio/mi.mp3' },
  { id: 94, text: 'MO', consonant: 'M', audioUrl: '/audio/mo.mp3' },
  { id: 95, text: 'MU', consonant: 'M', audioUrl: '/audio/mu.mp3' },
  { id: 96, text: 'MY', consonant: 'M', audioUrl: '/audio/my.mp3' },

  // --- N ---
  { id: 97, text: 'NA', consonant: 'N', audioUrl: '/audio/na.mp3' },
  { id: 98, text: 'NE', consonant: 'N', audioUrl: '/audio/ne.mp3' },
  { id: 99, text: 'NI', consonant: 'N', audioUrl: '/audio/ni.mp3' },
  { id: 100, text: 'NO', consonant: 'N', audioUrl: '/audio/no.mp3' },
  { id: 101, text: 'NU', consonant: 'N', audioUrl: '/audio/nu.mp3' },
  { id: 102, text: 'NY', consonant: 'N', audioUrl: '/audio/ny.mp3' },

  // --- Ń ---
  { id: 103, text: 'ŃA', consonant: 'Ń', audioUrl: '/audio/nia.mp3' },
  { id: 104, text: 'ŃE', consonant: 'Ń', audioUrl: '/audio/nie.mp3' },
  { id: 105, text: 'ŃI', consonant: 'Ń', audioUrl: '/audio/nii.mp3' },
  { id: 106, text: 'ŃO', consonant: 'Ń', audioUrl: '/audio/nio.mp3' },
  { id: 107, text: 'ŃU', consonant: 'Ń', audioUrl: '/audio/niu.mp3' },
  { id: 108, text: 'ŃY', consonant: 'Ń', audioUrl: '/audio/niy.mp3' },

  // --- P ---
  { id: 109, text: 'PA', consonant: 'P', audioUrl: '/audio/pa.mp3' },
  { id: 110, text: 'PE', consonant: 'P', audioUrl: '/audio/pe.mp3' },
  { id: 111, text: 'PI', consonant: 'P', audioUrl: '/audio/pi.mp3' },
  { id: 112, text: 'PO', consonant: 'P', audioUrl: '/audio/po.mp3' },
  { id: 113, text: 'PU', consonant: 'P', audioUrl: '/audio/pu.mp3' },
  { id: 114, text: 'PY', consonant: 'P', audioUrl: '/audio/py.mp3' },

  // --- R ---
  { id: 115, text: 'RA', consonant: 'R', audioUrl: '/audio/ra.mp3' },
  { id: 116, text: 'RE', consonant: 'R', audioUrl: '/audio/re.mp3' },
  { id: 117, text: 'RI', consonant: 'R', audioUrl: '/audio/ri.mp3' },
  { id: 118, text: 'RO', consonant: 'R', audioUrl: '/audio/ro.mp3' },
  { id: 119, text: 'RU', consonant: 'R', audioUrl: '/audio/ru.mp3' },
  { id: 120, text: 'RY', consonant: 'R', audioUrl: '/audio/ry.mp3' },

  // --- RZ ---
  { id: 121, text: 'RZA', consonant: 'RZ', audioUrl: '/audio/rza.mp3' },
  { id: 122, text: 'RZE', consonant: 'RZ', audioUrl: '/audio/rze.mp3' },
  { id: 123, text: 'RZI', consonant: 'RZ', audioUrl: '/audio/rzi.mp3' },
  { id: 124, text: 'RZO', consonant: 'RZ', audioUrl: '/audio/rzo.mp3' },
  { id: 125, text: 'RZUM', consonant: 'RZ', audioUrl: '/audio/rzu.mp3' }, // RZU is less common
  { id: 126, text: 'RZY', consonant: 'RZ', audioUrl: '/audio/rzy.mp3' },

  // --- S ---
  { id: 127, text: 'SA', consonant: 'S', audioUrl: '/audio/sa.mp3' },
  { id: 128, text: 'SE', consonant: 'S', audioUrl: '/audio/se.mp3' },
  { id: 129, text: 'SI', consonant: 'S', audioUrl: '/audio/si.mp3' },
  { id: 130, text: 'SO', consonant: 'S', audioUrl: '/audio/so.mp3' },
  { id: 131, text: 'SU', consonant: 'S', audioUrl: '/audio/su.mp3' },
  { id: 132, text: 'SY', consonant: 'S', audioUrl: '/audio/sy.mp3' },

  // --- Ś ---
  { id: 133, text: 'ŚA', consonant: 'Ś', audioUrl: '/audio/sia.mp3' },
  { id: 134, text: 'ŚE', consonant: 'Ś', audioUrl: '/audio/sie.mp3' },
  { id: 135, text: 'ŚI', consonant: 'Ś', audioUrl: '/audio/sii.mp3' },
  { id: 136, text: 'ŚO', consonant: 'Ś', audioUrl: '/audio/sio.mp3' },
  { id: 137, text: 'ŚU', consonant: 'Ś', audioUrl: '/audio/siu.mp3' },
  { id: 138, text: 'ŚY', consonant: 'Ś', audioUrl: '/audio/siy.mp3' },

  // --- SZ ---
  { id: 139, text: 'SZA', consonant: 'SZ', audioUrl: '/audio/sza.mp3' },
  { id: 140, text: 'SZE', consonant: 'SZ', audioUrl: '/audio/sze.mp3' },
  { id: 141, text: 'SZI', consonant: 'SZ', audioUrl: '/audio/szi.mp3' },
  { id: 142, text: 'SZO', consonant: 'SZ', audioUrl: '/audio/szo.mp3' },
  { id: 143, text: 'SZU', consonant: 'SZ', audioUrl: '/audio/szu.mp3' },
  { id: 144, text: 'SZY', consonant: 'SZ', audioUrl: '/audio/szy.mp3' },

  // --- T ---
  { id: 145, text: 'TA', consonant: 'T', audioUrl: '/audio/ta.mp3' },
  { id: 146, text: 'TE', consonant: 'T', audioUrl: '/audio/te.mp3' },
  { id: 147, text: 'TI', consonant: 'T', audioUrl: '/audio/ti.mp3' },
  { id: 148, text: 'TO', consonant: 'T', audioUrl: '/audio/to.mp3' },
  { id: 149, text: 'TU', consonant: 'T', audioUrl: '/audio/tu.mp3' },
  { id: 150, text: 'TY', consonant: 'T', audioUrl: '/audio/ty.mp3' },

  // --- W ---
  { id: 151, text: 'WA', consonant: 'W', audioUrl: '/audio/wa.mp3' },
  { id: 152, text: 'WE', consonant: 'W', audioUrl: '/audio/we.mp3' },
  { id: 153, text: 'WI', consonant: 'W', audioUrl: '/audio/wi.mp3' },
  { id: 154, text: 'WO', consonant: 'W', audioUrl: '/audio/wo.mp3' },
  { id: 155, text: 'WU', consonant: 'W', audioUrl: '/audio/wu.mp3' },
  { id: 156, text: 'WY', consonant: 'W', audioUrl: '/audio/wy.mp3' },

  // --- Z ---
  { id: 157, text: 'ZA', consonant: 'Z', audioUrl: '/audio/za.mp3' },
  { id: 158, text: 'ZE', consonant: 'Z', audioUrl: '/audio/ze.mp3' },
  { id: 159, text: 'ZI', consonant: 'Z', audioUrl: '/audio/zi.mp3' },
  { id: 160, text: 'ZO', consonant: 'Z', audioUrl: '/audio/zo.mp3' },
  { id: 161, text: 'ZU', consonant: 'Z', audioUrl: '/audio/zu.mp3' },
  { id: 162, text: 'ZY', consonant: 'Z', audioUrl: '/audio/zy.mp3' },

  // --- Ź ---
  { id: 163, text: 'ŹA', consonant: 'Ź', audioUrl: '/audio/zia.mp3' },
  { id: 164, text: 'ŹE', consonant: 'Ź', audioUrl: '/audio/zie.mp3' },
  { id: 165, text: 'ŹI', consonant: 'Ź', audioUrl: '/audio/zii.mp3' },
  { id: 166, text: 'ŹO', consonant: 'Ź', audioUrl: '/audio/zio.mp3' },
  { id: 167, text: 'ŹU', consonant: 'Ź', audioUrl: '/audio/ziu.mp3' },
  { id: 168, text: 'ŹY', consonant: 'Ź', audioUrl: '/audio/ziy.mp3' },

  // --- Ż ---
  { id: 169, text: 'ŻA', consonant: 'Ż', audioUrl: '/audio/za.mp3' }, // Often same as Z in pronunciation
  { id: 170, text: 'ŻE', consonant: 'Ż', audioUrl: '/audio/ze.mp3' },
  { id: 171, text: 'ŻI', consonant: 'Ż', audioUrl: '/audio/zi.mp3' },
  { id: 172, text: 'ŻO', consonant: 'Ż', audioUrl: '/audio/zo.mp3' },
  { id: 173, text: 'ŻU', consonant: 'Ż', audioUrl: '/audio/zu.mp3' },
  { id: 174, text: 'ŻY', consonant: 'Ż', audioUrl: '/audio/zy.mp3' },
  
];
