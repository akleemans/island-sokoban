import {LevelSet} from './level-set';

export class Level {

    public readonly baseGrid: string[];
    public readonly levelSet: LevelSet;
    public readonly nr: number;

    public constructor(baseGrid: string[], levelSet: LevelSet, nr: number) {
        this.baseGrid = baseGrid;
        this.levelSet = levelSet;
        this.nr = nr;
    }
}
