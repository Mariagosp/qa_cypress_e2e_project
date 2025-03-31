/// <reference types='cypress' />
/// <reference types='../support' />

describe('User', () => {
  let user1;
  let user2;
  before(() => {
    cy.task('generateUser').then((generateUser) => {
      user1 = generateUser;
    });
    cy.task('generateUser').then((generateUser) => {
      user2 = generateUser;
    });
  });

  it('should be able to follow the another user', () => {
    cy.visit(`#/@${user1.username}`)
    cy.register(user1.email, user1.username, user2.password);
    cy.contains(user1.username).should('be.visible');
    cy.visit(`/#/profile/${user2.username}`);

    // 3. Нажать кнопку "Follow"
    cy.get('.btn-outline-secondary').contains('Follow').click();

    // 4. Убедиться, что кнопка сменилась на "Unfollow"
    cy.get('.btn-outline-secondary').contains('Unfollow').should('be.visible');
  });
});
