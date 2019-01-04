export enum Difficulty {
    easy,
    medium,
    hard
}

export class LevelService {

    static getLevelData(difficulty: Difficulty, level: number) {
        let levels = new Map<Difficulty, object>();

        let easyLevels = {
            1: [
                '##########',
                '##########',
                '### .#####',
                '###  #####',
                '###*@  ###',
                '###  $ ###',
                '###  #####',
                '##########',
                '##########',
                '##########'
            ],
            2: [
                '##########',
                '##########',
                '###    ###',
                '### #@ ###',
                '### $* ###',
                '### .* ###',
                '###    ###',
                '##########',
                '##########',
                '##########'
            ]
        };

        levels.set(Difficulty.easy, easyLevels);

        return levels.get(difficulty)[level];
    }

}
