/*
ADPU Command List
Thanks ADPU Command from
https://github.com/chakphanu/ThaiNationalIDCard
*/

const CMD_SELECT = [[0x00, 0xa4, 0x04, 0x00, 0x08, 0xa0, 0x00, 0x00, 0x00, 0x54, 0x48, 0x00, 0x01]];

const CMD_CID = [
  [0x80, 0xb0, 0x00, 0x04, 0x02, 0x00, 0x0d],
  [0x00, 0xc0, 0x00, 0x00, 0x0d],
];

const CMD_PERSON_INFO = [
  [0x80, 0xb0, 0x00, 0x11, 0x02, 0x00, 0xd1],
  [0x00, 0xc0, 0x00, 0x00, 0xd1],
];

const CMD_ADDRESS = [
  [0x80, 0xb0, 0x15, 0x79, 0x02, 0x00, 0x64],
  [0x00, 0xc0, 0x00, 0x00, 0x64],
];

const CMD_ISSUE_EXPIRE = [
  [0x80, 0xb0, 0x01, 0x67, 0x02, 0x00, 0x12],
  [0x00, 0xc0, 0x00, 0x00, 0x12],
];

const _CMD_GET_PHOTO = () => {
  let cmds = [];

  for (let i = 0; i < 21; i++) {
    let xwd;
    let xof = i * 254 + 379;
    if (i === 20) {
      xwd = 38;
    } else {
      xwd = 254;
    }
    const sp2 = (xof >> 8) & 0xff;
    const sp3 = xof & 0xff;
    const sp6 = xwd & 0xff;
    const spx = xwd & 0xff;

    cmds.push([
      [0x80, 0xb0, sp2, sp3, 0x02, 0x00, sp6],
      [0x00, 0xc0, 0x00, 0x00, spx],
    ]);
  }

  return cmds;
};

const CMD_GET_PHOTO = _CMD_GET_PHOTO();

module.exports = {
  CMD_SELECT,
  CMD_CID,
  CMD_PERSON_INFO,
  CMD_ADDRESS,
  CMD_ISSUE_EXPIRE,
  CMD_GET_PHOTO,
};
