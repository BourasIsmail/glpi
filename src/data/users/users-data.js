export const dataUser = [
  {
    id: 1,
    name: "nnnnnnn",
    email: "admin@test.com",
    roles: "ADMIN_ROLES",
    password: "$2a$10$vVGkfNIWL34t0E0prGJpiuml8AZMRwsYQtqMvYufCgbux6H2o4DJm",
    divDuService: "aaannnnnaiiiaaaa",
  },
];
for (let i = 0; i < 50; i++) {
  dataUser.push({
    id: i + 2,
    name: "nnnnnnn" + i,
    email: `admin${i}@test.com`,
    roles: "ADMIN_ROLES",
    password: "$2a$10$vVGkfNIWL34t0E0prGJpiuml8AZMRwsYQtqMvYufCgbux6H2o4DJm",
    divDuService: "aaannnnnaiiiaaaa",
  });
}
