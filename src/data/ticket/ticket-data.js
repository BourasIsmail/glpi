export const dataTicket = [
  {
    id: 1,
    nomAuteur: "eeeee",
    etat: true,
    message: "aaaaaaaa",
    userInfo: {
      id: 1,
      name: "nnnnnnn",
      email: "admin@test.com",
      roles: "ADMIN_ROLES",
      password: "$2a$10$vVGkfNIWL34t0E0prGJpiuml8AZMRwsYQtqMvYufCgbux6H2o4DJm",
      divDuService: "aaannnnnaiiiaaaa",
    },
  },
];
for (let i = 0; i < 50; i++) {
  dataTicket.push({
    id: i + 2,
    nomAuteur: "eeeee" + i,
    etat: true,
    message: "aaaaaaaa" + i,
    userInfo: {
      id: i + 2,
      name: "nnnnnnn" + i,
      email: `admin${i}@test.com`,
      roles: "ADMIN_ROLES",
      password: "$2a$10$vVGkfNIWL34t0E0prGJpiuml8AZMRwsYQtqMvYufCgbux6H2o4DJm",
      divDuService: "aaannnnnaiiiaaaa",
    },
  });
}
