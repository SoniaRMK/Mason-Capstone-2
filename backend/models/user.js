"use strict";

const db = require("../db");
const bcrypt = require("bcrypt");
const { sqlForPartialUpdate } = require("../helpers/sql");
const {
    NotFoundError,
    BadRequestError,
    UnauthorizedError,
  } = require("../expressError");
  
const { BCRYPT_WORK_FACTOR } = require("../config.js");
const { strictEqual } = require("assert");

/** Related functions for users.
 * 
 * Returns { username, first_name, last_name, email, is_admin }
 * 
 * Throws UnauthorizedError if user is not found or entered a wrong password.
 */

class User {


    static async authenticate(username, password){
        // attempt search for user first
        const result = await db.query(
            `SELECT username,
                    password,
                    first_name AS "firstName",
                    last_name AS "lastName",
                    password,
                    created_at AS "createdAt"
                    is_admin AS "isAdmin"
             FROM user
             WHERE username = $1`,
             [username],
        );
        const user = result.rows[0];

        if (user){
            // compare hashed password to new hash from password
            const isValid = await bcrypt.compare(password, user.password);
            if (isValid === true){
                delete user.password;
                return user;
            }
        }

        throw new UnauthorizedError("Invalid username/password");
    }

    /** Register user with data
     * 
     * Returns { username, firstName, lastName, email, isAdmin}
     * 
     * Throws BadRequestError on duplicates
     */

     static async register(
        { username, password, firstName, lastName, email, isAdmin }) {
      const duplicateCheck = await db.query(
            `SELECT username
             FROM users
             WHERE username = $1`,
          [username],
      );
  
      if (duplicateCheck.rows[0]) {
        throw new BadRequestError(`Duplicate username: ${username}`);
      }
  
      const hashedPassword = await bcrypt.hash(password, BCRYPT_WORK_FACTOR);
  
      const result = await db.query(
            `INSERT INTO user
             (username,
              first_name,
              last_name,
              password,
              created_at,
              is_admin)
             VALUES ($1, $2, $3, $4, $5, $6)
             RETURNING username, first_name AS "firstName", last_name AS "lastName", password, created_at AS "createdAt", is_admin AS "isAdmin"`,
          [
            username,
            hashedPassword,
            firstName,
            lastName,
            password,
            createdAt,
            isAdmin,
          ],
      );
  
      const user = result.rows[0];
  
      return user;
    }

      /** Get a username, return data about user
       * 
       * Throws NotFoundError if user is not found.
       */

    static async get(username){
        const userRes = await db.query(
            `SELECT username,
                    password,
                    first_name AS "firstName",
                    last_name AS "lastName",
                    password,
                    created_at AS "createdAt"
                    is_admin AS "isAdmin"
             FROM user
             WHERE username = $1`,
             [username],
        );

        const user = userRes.rows[0];

        if (!user) throw new NotFoundError(`No user: ${username} found.`)
        
        const userWatchedMovies = await db.query(
            `SELECT w.user_id
            FROM watched_movies AS w
            WHERE w.username = $1`, [username]
        );

        user.watched_movies = userWatchedMovies.rows.map(w => w.user_id);
        return user;
    }

    /** Update user data with 'data'.
     * 
     * This is a "partial update" -- it's fine if data does not contain each field
     * so only changes are for provided fields.
     * 
     * Data can include: { firstName, lastName, password, isAdmin }
     * 
     * REturns { username, firstName, lastName, email, isAdmin }
     * 
     * Throws NotFoundError if not found.
     * 
     * Warning - this function can set a new password or make a user an admin.
     *  Callers of this function must be absolutely certain they have validated inputs to this
     * or a serious security risk can happen.
     */

    static async update(username, data){
        if (data.password){
            data.password = await bcrypt.hash(data.password, BCRYPT_WORK_FACTOR);
        }
        const { setCols, values } = sqlForPartialUpdate(
            data, 
            {
                firstName: "first_name",
                lastName: "last_name",
                isAdmin: "is_admin",
            }
        );
        const usernameVarIdx = "$" + (values.length + 1);

        const querySql = `UPDATE user
                          SET ${setCols}
                          WHERE username = ${usernameVarIdx}
                          RETURNING username, 
                                    first_name AS "firstName",
                                    last_name AS "lastName",
                                    is_admin AS "isAdmin"`;
        const result = await db.query(querySql, [...values, username]);
        const user = result.rows[0];

        if (!user) throw new NotFoundError(`No user: ${username}`);

        delete user.password;
        return user;
    }   

    /** Delete given user from database; returns undefined. */

    static async remove(username) {
        let result = await db.query(
           `DELETE
            FROM user
            WHERE username = $1
            RETURNING username`,
            [username],
    );
    const user = result.rows[0];

    if (!user) throw new NotFoundError(`No user: ${username}`);
  }

  /** NEED A WATCHED MOVIE METHOD FOR USERS
   * 
   * 
   */
}

module.exports = User;
       