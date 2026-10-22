/**
 * Data-access helpers for publishers.
 * Used by Astro pages at build time and by unit tests, with the database
 * injected so both a real and an in-memory client can be used.
 */

import { asc } from 'drizzle-orm';
import type { Database } from './db';
import { publishers } from '../../db/schema';
import type { Publisher } from '../types/game';

/**
 * Returns every publisher's id and name, ordered by name (then id) so that
 * static builds are deterministic.
 *
 * @param db - The Drizzle database instance to query.
 * @returns A promise resolving to all publishers as `{ id, name }` objects.
 */
export async function getAllPublishers(db: Database): Promise<Publisher[]> {
    const rows = await db
        .select({ id: publishers.id, name: publishers.name })
        .from(publishers)
        .orderBy(asc(publishers.name), asc(publishers.id));
    return rows.map((row) => ({ id: row.id, name: row.name }));
}
